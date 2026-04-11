import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'Fairy Meadows', minLength: 2 })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'A stunning alpine meadow near Nanga Parbat.', minLength: 10 })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiPropertyOptional({ example: 'Gilgit-Baltistan, Pakistan', description: 'Free-text location / address' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'Gilgit-Baltistan' })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({ example: 'Mountain' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'Detailed multi-paragraph description…' })
  @IsOptional()
  @IsString()
  longDescription?: string;

  @ApiPropertyOptional({ example: 4.8, minimum: 0, maximum: 5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating?: number;

  @ApiPropertyOptional({ example: '3,300 m' })
  @IsOptional()
  @IsString()
  altitude?: string;

  @ApiPropertyOptional({ example: 'June – September' })
  @IsOptional()
  @IsString()
  bestTime?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' || value === true ? true
    : value === 'false' || value === false ? false
    : undefined,
  )
  published?: boolean;
}

/** All fields optional for PATCH */
export class UpdatePlaceDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(2) name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(10) description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() region?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() category?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() longDescription?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Max(5) @Type(() => Number) rating?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() altitude?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() bestTime?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' || value === true ? true
    : value === 'false' || value === false ? false
    : undefined,
  )
  published?: boolean;
}
