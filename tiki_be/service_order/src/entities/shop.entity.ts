import { Decimal } from '@prisma/client/runtime/library';
import { Product } from 'src/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn()
  shopid: number;

  @Column({ nullable: true, length: 100 })
  name?: string | null;

  @Column({ nullable: true })
  official?: boolean | null;

  @Column('decimal', { nullable: true, precision: 3, scale: 2 })
  rating?: Decimal | null;

  @Column({ nullable: true, length: 255 })
  location?: string | null;

  @Column({
    type: 'timestamp',
    precision: 6,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdat?: Date | null;

  @OneToMany(() => Product, (product) => product.shops, { nullable: true })
  products?: Product[];
}
