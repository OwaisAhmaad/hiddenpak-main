import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsOptional()
  @IsString()
  alt?: string;

  /** Caption shown below image in gallery — maps to imageUrl response */
  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(['tall', 'medium', 'short'])
  height?: string;
}
