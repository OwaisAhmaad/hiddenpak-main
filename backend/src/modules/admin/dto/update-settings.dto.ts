import { IsBoolean, IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional() @IsString() siteName?: string;
  @IsOptional() @IsString() siteTagline?: string;
  @IsOptional() @IsEmail() contactEmail?: string;
  @IsOptional() @IsString() contactPhone?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() facebookUrl?: string;
  @IsOptional() @IsString() instagramUrl?: string;
  @IsOptional() @IsString() twitterUrl?: string;
  @IsOptional() @IsString() youtubeUrl?: string;
  @IsOptional() @IsBoolean() maintenanceMode?: boolean;
  @IsOptional() @IsBoolean() allowRegistration?: boolean;
}
