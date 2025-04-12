import { IsNumber, IsOptional, IsDecimal } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsOptional()
  userid?: number;

  @IsDecimal()
  @IsOptional()
  totalamount?: number;

  @IsOptional()
  createdat?: Date;
}
