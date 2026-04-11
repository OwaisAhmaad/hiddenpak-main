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
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  authorImage?: string;

  @IsOptional()
  @IsString()
  authorBio?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;

  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' || value === true
      ? true
      : value === 'false' || value === false
        ? false
        : undefined,
  )
  published?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  })
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  readTime?: string;
}

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  content?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  authorImage?: string;

  @IsOptional()
  @IsString()
  authorBio?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;

  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' || value === true
      ? true
      : value === 'false' || value === false
        ? false
        : undefined,
  )
  published?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  })
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  readTime?: string;
}
