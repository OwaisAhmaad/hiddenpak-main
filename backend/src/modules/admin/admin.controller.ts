import {
  Controller,
  Get,
  Put,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdminService } from './admin.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@ApiTags('Admin — Profile & Settings')
@ApiBearerAuth('access-token')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get admin profile' })
  @ApiResponse({
    status: 200,
    description: 'Admin profile data',
    schema: {
      example: {
        success: true,
        message: 'OK',
        data: {
          _id: '64f...',
          name: 'Admin User',
          email: 'admin@hiddenpak.com',
          role: 'admin',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized — missing or invalid JWT' })
  getProfile(@Request() req: any) {
    return this.adminService.getProfile(req.user.sub);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update admin profile / change password' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    schema: {
      example: {
        success: true,
        message: 'Profile updated successfully',
        data: {
          _id: '64f...',
          name: 'New Name',
          email: 'new@hiddenpak.com',
          role: 'admin',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation error or incorrect current password' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
    return this.adminService.updateProfile(req.user.sub, dto);
  }

  @Get('settings')
  @ApiOperation({ summary: 'Get site settings' })
  @ApiResponse({
    status: 200,
    description: 'Current site settings',
    schema: {
      example: {
        success: true,
        message: 'OK',
        data: {
          siteName: 'HiddenPak',
          siteTagline: "Discover Pakistan's Hidden Gems",
          contactEmail: 'contact@hiddenpak.com',
          contactPhone: '+92-300-1234567',
          address: 'Islamabad, Pakistan',
          facebookUrl: 'https://facebook.com/HiddenPak',
          instagramUrl: 'https://instagram.com/hiddenpak',
          twitterUrl: 'https://twitter.com/HiddenPak',
          youtubeUrl: 'https://youtube.com/@HiddenPak',
          maintenanceMode: false,
          allowRegistration: true,
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getSettings() {
    return this.adminService.getSettings();
  }

  @Patch('settings')
  @ApiOperation({ summary: 'Update site settings (partial)' })
  @ApiResponse({
    status: 200,
    description: 'Settings updated successfully',
    schema: {
      example: {
        success: true,
        message: 'Settings updated successfully',
        data: {
          siteName: 'HiddenPak',
          maintenanceMode: false,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  updateSettings(@Body() dto: UpdateSettingsDto) {
    return this.adminService.updateSettings(dto);
  }
}
