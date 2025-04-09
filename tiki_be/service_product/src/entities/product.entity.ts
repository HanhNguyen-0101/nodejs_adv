import { Category } from 'src/categories/entities/category.entity';
import { ProductCoupons } from 'src/product_coupons/entities/product_coupon.entity';
import { ProductTags } from 'src/product_tags/entities/product_tag.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  productid: number;

  @Column({ nullable: true, length: 100 })
  name?: string;

  @Column({ nullable: true })
  description?: string;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  price?: number;

  @Column({ nullable: true })
  stock?: number;

  @Column({ nullable: true, length: 100 })
  madein?: string;

  @Column('decimal', { nullable: true, precision: 3, scale: 2 })
  rating?: number;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  discount?: number;

  @Column({ nullable: true, length: 255 })
  image?: string;

  @Column({ nullable: true })
  maxdeliveryday?: number;

  @Column({ nullable: true, length: 255 })
  images?: string;

  @Column({ nullable: true })
  shopid?: number;

  @Column({ nullable: true })
  categoryid?: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  categories?: Category;

  @ManyToOne(() => Shop, (shop) => shop.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  shops?: Shop;

  @OneToMany(() => ProductCoupons, (productCoupon) => productCoupon.product, {
    nullable: true,
  })
  product_coupons?: ProductCoupons[];

  @OneToMany(() => ProductTags, (productTag) => productTag.product, {
    nullable: true,
  })
  product_tags?: ProductTags[];
}
