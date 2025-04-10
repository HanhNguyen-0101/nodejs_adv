import { Product } from 'src/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  categoryid: number;

  @Column({ nullable: true, length: 100 })
  name?: string | null;

  @Column({ nullable: true })
  description?: string | null;

  @Column({ nullable: true, length: 255 })
  img?: string | null;

  @OneToMany(() => Product, (product) => product.categories, { nullable: true })
  products?: Product[];
}