import {
  IsString,
  IsNumber,
  IsOptional,
  IsDecimal,
  IsNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  madein?: string;

  @IsDecimal()
  @IsOptional()
  rating?: number;

  @IsDecimal()
  @IsOptional()
  discount?: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsOptional()
  maxdeliveryday?: number;

  @IsString()
  @IsOptional()
  images?: string;

  @IsNumber()
  @IsOptional()
  shopid?: number;

  @IsNumber()
  @IsOptional()
  categoryid?: number;
}
