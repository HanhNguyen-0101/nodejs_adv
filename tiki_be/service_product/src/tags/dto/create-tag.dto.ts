import { IsString, IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsOptional()
  name?: string;
}
