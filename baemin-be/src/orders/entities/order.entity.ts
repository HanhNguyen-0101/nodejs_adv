import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

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
