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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSettingsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateSettingsDto {
}
exports.UpdateSettingsDto = UpdateSettingsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'HiddenPak', description: 'Site display name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Discover Pakistan's Hidden Gems", description: 'Site tagline' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "siteTagline", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'contact@hiddenpak.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "contactEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+92-300-1234567' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Islamabad, Pakistan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://facebook.com/HiddenPak' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "facebookUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://instagram.com/hiddenpak' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "instagramUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://twitter.com/HiddenPak' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "twitterUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://youtube.com/@HiddenPak' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "youtubeUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Put site in maintenance mode' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateSettingsDto.prototype, "maintenanceMode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Allow new user registrations' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateSettingsDto.prototype, "allowRegistration", void 0);
//# sourceMappingURL=update-settings.dto.js.map