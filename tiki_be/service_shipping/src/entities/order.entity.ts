import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { OrderItem } from './order_item.entity';
import { User } from './user.entity';
import { Shipping } from './shipping.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderid: number;

  @Column({ nullable: true })
  userid?: number;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  totalamount?: number;

  @Column({ type: 'timestamp', precision: 6, nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createdat?: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orders, { nullable: true })
  order_items?: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  users?: User;

  @OneToMany(() => Shipping, (shipping) => shipping.orders, { nullable: true })
  shippings?: Shipping[];
}
