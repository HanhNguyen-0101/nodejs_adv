import { IsString, IsOptional, IsBoolean, IsDecimal } from 'class-validator';

export class CreateShopDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  official?: boolean;

  @IsDecimal()
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  location?: string;

  @IsOptional()
  createdat?: Date;
}
