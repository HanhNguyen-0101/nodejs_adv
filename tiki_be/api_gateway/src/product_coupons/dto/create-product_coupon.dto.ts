import { IsNumber } from 'class-validator';

export class CreateProductCouponDto {
  @IsNumber()
  productid: number;

  @IsNumber()
  couponid: number;
}
