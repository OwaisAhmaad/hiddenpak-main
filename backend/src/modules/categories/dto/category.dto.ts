import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryType } from '../../../database/schemas/category.schema';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Mountains', description: 'Category name (min 2 chars)' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiPropertyOptional({ example: 'mountains', description: 'URL-friendly slug (auto-generated if omitted)' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ enum: CategoryType, example: CategoryType.OTHER, description: 'Category type' })
  @IsEnum(CategoryType)
  type: CategoryType;

  @ApiPropertyOptional({ example: 'Scenic mountain ranges and peaks across Pakistan' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Valleys', description: 'Updated category name' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({ example: 'valleys' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ enum: CategoryType, example: CategoryType.VILLAGE })
  @IsOptional()
  @IsEnum(CategoryType)
  type?: CategoryType;

  @ApiPropertyOptional({ example: 'Beautiful valleys and river gorges' })
  @IsOptional()
  @IsString()
  description?: string;
}
