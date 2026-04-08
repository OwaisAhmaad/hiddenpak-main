import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlaceDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  region: string;

  @IsString()
  category: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  @MinLength(20)
  longDescription: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rating?: number;

  @IsOptional()
  @IsString()
  altitude?: string;

  @IsOptional()
  @IsString()
  bestTime?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class UpdatePlaceDto extends CreatePlaceDto {}
