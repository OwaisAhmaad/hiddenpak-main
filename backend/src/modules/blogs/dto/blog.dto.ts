import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(10)
  excerpt: string;

  @IsString()
  @MinLength(50)
  content: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  authorImage?: string;

  @IsOptional()
  @IsString()
  authorBio?: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsString()
  readTime?: string;
}

export class UpdateBlogDto extends CreateBlogDto {}
