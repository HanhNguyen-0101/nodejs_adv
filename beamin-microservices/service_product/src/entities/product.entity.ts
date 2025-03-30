import { Category } from 'src/categories/entities/category.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Category, category => category.category_id)
  category: Category;

  @ManyToOne(() => Shop, shop => shop.shop_id)
  shop: Shop;

  @CreateDateColumn()
  created_at: Date | null;
}
