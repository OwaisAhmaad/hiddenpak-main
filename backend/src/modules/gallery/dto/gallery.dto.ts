import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateGalleryDto {
  @ApiPropertyOptional({ example: 'Mountain sunrise at Fairy Meadows' })
  @IsOptional()
  @IsString()
  alt?: string;

  @ApiPropertyOptional({ example: 'Golden hour over Nanga Parbat' })
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiPropertyOptional({ example: 'Fairy Meadows, Gilgit-Baltistan' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ enum: ['tall', 'medium', 'short'], example: 'medium' })
  @IsOptional()
  @IsEnum(['tall', 'medium', 'short'])
  height?: string;
}
