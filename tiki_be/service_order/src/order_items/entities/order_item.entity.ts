import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  orderitemid: number;

  @Column({ nullable: true })
  orderid?: number;

  @Column({ nullable: true })
  productid?: number;

  @Column({ nullable: true })
  quantity?: number;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  price?: number;

  @ManyToOne(() => Order, (order) => order.order_items, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  orders?: Order;

  @ManyToOne(() => Product, (product) => product.productid, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  products?: Product;
}
