import { IsInt, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  @IsNotEmpty()
  order_id: number;

  @IsInt()
  product_id: number;

  @IsInt()
  quantity: number;

  @IsDecimal()
  price: number;
}
