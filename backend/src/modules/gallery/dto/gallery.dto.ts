import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsOptional()
  @IsString()
  alt?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(['tall', 'medium', 'short'])
  height?: string;
}
