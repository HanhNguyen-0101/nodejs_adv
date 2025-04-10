import { Decimal } from '@prisma/client/runtime/library';
import { ProductCoupons } from 'src/product_coupons/entities/product_coupon.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  couponid: number;

  @Column({ nullable: true, length: 50 })
  code?: string | null;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  discount?: Decimal | null;

  @Column({ type: 'timestamp', precision: 6, nullable: true })
  expirationdate?: Date | null;

  @OneToMany(() => ProductCoupons, (productCoupons) => productCoupons.coupon, {
    nullable: true,
  })
  product_coupons?: ProductCoupons[];
}
