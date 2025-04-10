import { IsString, IsNumber, IsOptional, IsDecimal } from 'class-validator';

export class CreateShippingDto {
  @IsNumber()
  @IsOptional()
  orderid?: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  shippingmethod?: string;

  @IsDecimal()
  @IsOptional()
  cost?: number;

  @IsOptional()
  deliveredat?: Date;
}
