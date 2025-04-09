import { Product } from 'src/entities/product.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';

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
