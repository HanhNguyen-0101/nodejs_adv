import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Coupon } from './coupon.entity';

@Entity('product_coupons')
export class ProductCoupons {
  @PrimaryColumn()
  productid: number;

  @PrimaryColumn()
  couponid: number;

  @ManyToOne(() => Product, (product) => product.product_coupons, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: false,
  })
  product: Product;

  @ManyToOne(() => Coupon, (coupon) => coupon.product_coupons, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: false,
  })
  coupon: Coupon;
}