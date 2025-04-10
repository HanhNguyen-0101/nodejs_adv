import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Tag } from './tag.entity';

@Entity('product_tags')
export class ProductTags {
  @PrimaryColumn()
  productid: number;

  @PrimaryColumn()
  tagid: number;

  @ManyToOne(() => Product, (product) => product.product_tags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: false,
  })
  product: Product;

  @ManyToOne(() => Tag, (tag) => tag.product_tags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: false,
  })
  tag: Tag;
}
