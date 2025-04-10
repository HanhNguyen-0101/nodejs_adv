import { IsObject } from 'class-validator';

export class UpdateProductCouponDto {
  @IsObject()
  products: { connect: { productid: number } };

  @IsObject()
  coupons: { connect: { couponid: number } };
}