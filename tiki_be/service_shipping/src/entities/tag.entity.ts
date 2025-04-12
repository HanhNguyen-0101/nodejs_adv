import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductTags } from './product_tag.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  tagid: number;

  @Column({ nullable: true, length: 100 })
  name?: string | null;

  @OneToMany(() => ProductTags, (productTags) => productTags.tag, {
    nullable: true,
  })
  product_tags?: ProductTags[];
}
