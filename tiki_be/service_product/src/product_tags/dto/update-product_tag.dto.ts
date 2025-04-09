import { IsObject } from 'class-validator';

export class UpdateProductTagDto {
  @IsObject()
  products: { connect: { productid: number } };

  @IsObject()
  tags: { connect: { tagid: number } };
}