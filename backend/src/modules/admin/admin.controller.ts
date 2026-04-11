import {
  Controller,
  Get,
  Put,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdminService } from './admin.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('profile')
  getProfile(@Request() req: any) {
    return this.adminService.getProfile(req.user.sub);
  }

  @Put('profile')
  updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
    return this.adminService.updateProfile(req.user.sub, dto);
  }

  @Get('settings')
  getSettings() {
    return this.adminService.getSettings();
  }

  @Patch('settings')
  updateSettings(@Body() dto: UpdateSettingsDto) {
    return this.adminService.updateSettings(dto);
  }
}
