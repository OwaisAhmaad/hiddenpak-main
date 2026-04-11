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
exports.SettingsSchema = exports.Settings = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Settings = class Settings {
};
exports.Settings = Settings;
__decorate([
    (0, mongoose_1.Prop)({ default: 'HiddenPak' }),
    __metadata("design:type", String)
], Settings.prototype, "siteName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Discover Pakistan\'s Hidden Gems' }),
    __metadata("design:type", String)
], Settings.prototype, "siteTagline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'hello@hiddenpak.com' }),
    __metadata("design:type", String)
], Settings.prototype, "contactEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '+92-300-0000000' }),
    __metadata("design:type", String)
], Settings.prototype, "contactPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Islamabad, Pakistan' }),
    __metadata("design:type", String)
], Settings.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'https://facebook.com/HiddenPak' }),
    __metadata("design:type", String)
], Settings.prototype, "facebookUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'https://instagram.com/hiddenpak' }),
    __metadata("design:type", String)
], Settings.prototype, "instagramUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'https://twitter.com/HiddenPak' }),
    __metadata("design:type", String)
], Settings.prototype, "twitterUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'https://youtube.com/@HiddenPak' }),
    __metadata("design:type", String)
], Settings.prototype, "youtubeUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Settings.prototype, "maintenanceMode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Settings.prototype, "allowRegistration", void 0);
exports.Settings = Settings = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Settings);
exports.SettingsSchema = mongoose_1.SchemaFactory.createForClass(Settings);
//# sourceMappingURL=settings.schema.js.map