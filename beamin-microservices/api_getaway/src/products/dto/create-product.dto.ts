import { IsString, IsNotEmpty, IsDecimal, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsDecimal()
  price: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  category_id: number;

  @IsInt()
  shop_id: number;
}
