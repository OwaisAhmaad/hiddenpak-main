import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard, JwtRefreshGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login', description: 'Returns accessToken (15 min) + refreshToken (7 days)' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful — returns JWT tokens', schema: { example: { success: true, message: 'Login successful', data: { accessToken: 'eyJ...', refreshToken: 'eyJ...' } } } })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Refresh access token', description: 'Send refresh token in Authorization header to get a new access token' })
  @ApiResponse({ status: 200, description: 'New accessToken issued' })
  @ApiResponse({ status: 403, description: 'Invalid or expired refresh token' })
  refresh(@Request() req: any) {
    return this.auth.refresh(req.user.sub, req.user.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Logout', description: 'Invalidates the refresh token in DB' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @ApiResponse({ status: 401, description: 'No valid token' })
  logout(@Request() req: any) {
    return this.auth.logout(req.user.sub);
  }
}
