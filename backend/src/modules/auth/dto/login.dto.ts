import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@hiddenpak.com', description: 'Admin email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Admin@123456', description: 'Password (min 6 chars)', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}
