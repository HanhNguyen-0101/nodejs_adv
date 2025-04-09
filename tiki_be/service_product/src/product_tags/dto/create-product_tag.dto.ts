import { IsNumber } from 'class-validator';

export class CreateProductTagDto {
  @IsNumber()
  productid: number;

  @IsNumber()
  tagid: number;
}
