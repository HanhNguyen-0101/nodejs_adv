import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Product } from 'src/entities/product.entity';
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';

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