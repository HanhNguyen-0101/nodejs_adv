import { IsInt, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsDecimal()
  total: number;
}
