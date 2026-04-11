import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum BlogStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export class CreateBlogDto {
  @ApiProperty({ example: 'Exploring Hunza Valley in Spring', minLength: 3 })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiPropertyOptional({ example: 'A short teaser about the blog post…' })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ example: 'Full article content goes here…', minLength: 10 })
  @IsString()
  @MinLength(10)
  content: string;

  @ApiPropertyOptional({ example: 'Ali Raza' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ example: 'Travel writer and photographer' })
  @IsOptional()
  @IsString()
  authorBio?: string;

  @ApiPropertyOptional({ example: 'Trekking' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: '64f1a2b3c4d5e6f7a8b9c0d1', description: 'MongoDB ObjectId of a Category document' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ enum: BlogStatus, example: BlogStatus.PUBLISHED })
  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' || value === true ? true
    : value === 'false' || value === false ? false
    : undefined,
  )
  published?: boolean;

  @ApiPropertyOptional({ type: [String], example: ['hunza', 'spring', 'gilgit'] })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  })
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: '7 min read' })
  @IsOptional()
  @IsString()
  readTime?: string;
}

export class UpdateBlogDto {
  @ApiPropertyOptional({ example: 'Updated title', minLength: 3 })
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiPropertyOptional({ minLength: 10 })
  @IsOptional()
  @IsString()
  @MinLength(10)
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  authorBio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ enum: BlogStatus })
  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' || value === true ? true
    : value === 'false' || value === false ? false
    : undefined,
  )
  published?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  })
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readTime?: string;
}
