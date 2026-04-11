"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users/users.service");
const settings_schema_1 = require("../../database/schemas/settings.schema");
let AdminService = class AdminService {
    constructor(usersService, settingsModel) {
        this.usersService = usersService;
        this.settingsModel = settingsModel;
    }
    async getProfile(userId) {
        const user = await this.usersService.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('Admin user not found');
        const { password, refreshToken, ...safe } = user.toObject();
        return { message: 'Profile retrieved', data: safe };
    }
    async updateProfile(userId, dto) {
        const user = await this.usersService.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('Admin user not found');
        const update = {};
        if (dto.email && dto.email !== user.email) {
            update.email = dto.email;
        }
        if (dto.newPassword) {
            if (!dto.currentPassword) {
                throw new common_1.BadRequestException('Current password is required to set a new password');
            }
            const valid = await bcrypt.compare(dto.currentPassword, user.password);
            if (!valid)
                throw new common_1.UnauthorizedException('Current password is incorrect');
            update.password = await bcrypt.hash(dto.newPassword, 12);
        }
        if (Object.keys(update).length === 0) {
            const { password, refreshToken, ...safe } = user.toObject();
            return { message: 'No changes made', data: safe };
        }
        const updated = await this.usersService.updateById(userId, update);
        const { password, refreshToken, ...safe } = updated.toObject();
        return { message: 'Profile updated successfully', data: safe };
    }
    async getSettings() {
        let settings = await this.settingsModel.findOne().exec();
        if (!settings) {
            settings = await this.settingsModel.create({});
        }
        return { message: 'Settings retrieved', data: settings };
    }
    async updateSettings(dto) {
        let settings = await this.settingsModel.findOne().exec();
        if (!settings) {
            settings = await this.settingsModel.create(dto);
        }
        else {
            Object.assign(settings, dto);
            await settings.save();
        }
        return { message: 'Settings updated successfully', data: settings };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(settings_schema_1.Settings.name)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        mongoose_2.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map