import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  user: User;

  @CreateDateColumn()
  order_date: Date | null;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;
}
