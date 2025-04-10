import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity('shippings')
export class Shipping {
  @PrimaryGeneratedColumn()
  shippingid: number;

  @Column({ nullable: true })
  orderid?: number;

  @Column({ nullable: true, length: 255 })
  address?: string;

  @Column({ nullable: true, length: 100 })
  shippingmethod?: string;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  cost?: number;

  @Column({ type: 'timestamp', precision: 6, nullable: true })
  deliveredat?: Date;

  @ManyToOne(() => Order, (order) => order.shippings, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  orders?: Order;
}
