import { ProductTags } from 'src/product_tags/entities/product_tag.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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
