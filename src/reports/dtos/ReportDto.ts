import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
