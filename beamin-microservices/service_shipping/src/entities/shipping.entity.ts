import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('shipping')
export class Shipping {
  @PrimaryGeneratedColumn()
  shipping_id: number;

  @ManyToOne(() => Order, (order) => order.order_id)
  order: Order;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column()
  country: string;

  @CreateDateColumn({ nullable: true })
  shipped_date: Date | null;

  @Column()
  shipping_method: string;
}
