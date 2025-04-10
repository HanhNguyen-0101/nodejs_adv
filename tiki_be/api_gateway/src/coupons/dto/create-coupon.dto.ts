import { IsString, IsNotEmpty, IsOptional, IsDecimal } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsDecimal()
  @IsOptional()
  discount?: number;

  @IsOptional()
  expirationdate?: Date;
}
