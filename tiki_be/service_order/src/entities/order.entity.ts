import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Shipping } from './shipping.entity'; // Import the Shipping entity for the relation
import { User } from './user.entity'; // Import the User entity for the relation (assuming users table exists)
import { OrderItem } from 'src/order_items/entities/order_item.entity';

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
