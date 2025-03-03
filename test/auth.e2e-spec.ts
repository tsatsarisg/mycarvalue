import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Authentication system (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const testEmail = 'asdfgasd23@asdf.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: testEmail, password: 'sasdfojggig' })
      .expect(201)
      .then((res) => {
        console.log(res);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(testEmail);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'asdf@asdf.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdf' })
      .expect(201);

    const cookie = res.get('Set-Cookie') || [];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(body.email).toEqual(email);
  });
});
