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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const admin_service_1 = require("./admin.service");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const update_settings_dto_1 = require("./dto/update-settings.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    getProfile(req) {
        return this.adminService.getProfile(req.user.sub);
    }
    updateProfile(req, dto) {
        return this.adminService.updateProfile(req.user.sub, dto);
    }
    getSettings() {
        return this.adminService.getSettings();
    }
    updateSettings(dto) {
        return this.adminService.updateSettings(dto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get admin profile' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized — missing or invalid JWT' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Update admin profile / change password' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error or incorrect current password' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Get site settings' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Patch)('settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Update site settings (partial)' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_settings_dto_1.UpdateSettingsDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateSettings", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin — Profile & Settings'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map