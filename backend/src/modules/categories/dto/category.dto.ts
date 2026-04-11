import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { CategoryType } from '../../../database/schemas/category.schema';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsEnum(CategoryType)
  type: CategoryType;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsEnum(CategoryType)
  type?: CategoryType;

  @IsOptional()
  @IsString()
  description?: string;
}
