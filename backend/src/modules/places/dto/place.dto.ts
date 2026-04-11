import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
  MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreatePlaceDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

  /** Physical / map location string, e.g. "Gilgit-Baltistan, Pakistan" */
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  longDescription?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating?: number;

  @IsOptional()
  @IsString()
  altitude?: string;

  @IsOptional()
  @IsString()
  bestTime?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' || value === true
      ? true
      : value === 'false' || value === false
        ? false
        : undefined,
  )
  published?: boolean;
}

/** All fields optional for PATCH */
export class UpdatePlaceDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  longDescription?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating?: number;

  @IsOptional()
  @IsString()
  altitude?: string;

  @IsOptional()
  @IsString()
  bestTime?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' || value === true
      ? true
      : value === 'false' || value === false
        ? false
        : undefined,
  )
  published?: boolean;
}
