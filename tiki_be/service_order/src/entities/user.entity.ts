import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({ unique: true })
  name: string | null;

  @Column()
  password: string | null;

  @Column({ unique: true })
  email: string | null;

  @Column({ unique: true })
  phone: string | null;

  @Column()
  address: string | null;

  @CreateDateColumn()
  createdat: Date | null;
}
