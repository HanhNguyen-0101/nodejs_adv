import { IsNumber, IsOptional, IsDecimal } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsOptional()
  orderid?: number;

  @IsNumber()
  @IsOptional()
  productid?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsDecimal()
  @IsOptional()
  price?: number;
}
