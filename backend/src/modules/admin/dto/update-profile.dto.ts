import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Admin User', description: 'Display name (min 2 chars)' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({ example: 'admin@hiddenpak.com', description: 'Admin email address' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'currentPass123', description: 'Current password (required when changing password)' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  currentPassword?: string;

  @ApiPropertyOptional({ example: 'newSecurePass456', description: 'New password (min 6 chars)' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  newPassword?: string;
}
