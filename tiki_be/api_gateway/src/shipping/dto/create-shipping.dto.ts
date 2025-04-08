import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShippingDto {
  @IsInt()
  @IsNotEmpty()
  order_id: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  shipping_method: string;
}
