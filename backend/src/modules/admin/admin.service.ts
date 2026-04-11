import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { Settings, SettingsDocument } from '../../database/schemas/settings.schema';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('Admin user not found');
    const { password, refreshToken, ...safe } = (user as any).toObject();
    return { message: 'Profile retrieved', data: safe };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('Admin user not found');

    const update: Record<string, any> = {};

    if (dto.email && dto.email !== user.email) {
      update.email = dto.email;
    }

    if (dto.newPassword) {
      if (!dto.currentPassword) {
        throw new BadRequestException('Current password is required to set a new password');
      }
      const valid = await bcrypt.compare(dto.currentPassword, user.password);
      if (!valid) throw new UnauthorizedException('Current password is incorrect');
      update.password = await bcrypt.hash(dto.newPassword, 12);
    }

    if (Object.keys(update).length === 0) {
      return { message: 'No changes made', data: user };
    }

    const updated = await this.usersService.updateById(userId, update);
    const { password, refreshToken, ...safe } = (updated as any).toObject();
    return { message: 'Profile updated successfully', data: safe };
  }

  async getSettings() {
    let settings = await this.settingsModel.findOne().exec();
    if (!settings) {
      settings = await this.settingsModel.create({});
    }
    return { message: 'Settings retrieved', data: settings };
  }

  async updateSettings(dto: UpdateSettingsDto) {
    let settings = await this.settingsModel.findOne().exec();
    if (!settings) {
      settings = await this.settingsModel.create(dto);
    } else {
      Object.assign(settings, dto);
      await settings.save();
    }
    return { message: 'Settings updated successfully', data: settings };
  }
}
