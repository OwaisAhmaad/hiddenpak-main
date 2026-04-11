import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiPropertyOptional({ example: 'HiddenPak', description: 'Site display name' })
  @IsOptional() @IsString() siteName?: string;

  @ApiPropertyOptional({ example: "Discover Pakistan's Hidden Gems", description: 'Site tagline' })
  @IsOptional() @IsString() siteTagline?: string;

  @ApiPropertyOptional({ example: 'contact@hiddenpak.com' })
  @IsOptional() @IsEmail() contactEmail?: string;

  @ApiPropertyOptional({ example: '+92-300-1234567' })
  @IsOptional() @IsString() contactPhone?: string;

  @ApiPropertyOptional({ example: 'Islamabad, Pakistan' })
  @IsOptional() @IsString() address?: string;

  @ApiPropertyOptional({ example: 'https://facebook.com/HiddenPak' })
  @IsOptional() @IsString() facebookUrl?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/hiddenpak' })
  @IsOptional() @IsString() instagramUrl?: string;

  @ApiPropertyOptional({ example: 'https://twitter.com/HiddenPak' })
  @IsOptional() @IsString() twitterUrl?: string;

  @ApiPropertyOptional({ example: 'https://youtube.com/@HiddenPak' })
  @IsOptional() @IsString() youtubeUrl?: string;

  @ApiPropertyOptional({ example: false, description: 'Put site in maintenance mode' })
  @IsOptional() @IsBoolean() maintenanceMode?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Allow new user registrations' })
  @IsOptional() @IsBoolean() allowRegistration?: boolean;
}
