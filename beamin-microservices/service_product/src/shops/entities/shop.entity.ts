import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn()
  shop_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string | null;

  @CreateDateColumn()
  created_at: Date | null;
}
