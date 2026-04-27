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
exports.CreateGalleryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateGalleryDto {
}
exports.CreateGalleryDto = CreateGalleryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Mountain sunrise at Fairy Meadows' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGalleryDto.prototype, "alt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Golden hour over Nanga Parbat' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGalleryDto.prototype, "caption", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Fairy Meadows, Gilgit-Baltistan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGalleryDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['tall', 'medium', 'short'], example: 'medium' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['tall', 'medium', 'short']),
    __metadata("design:type", String)
], CreateGalleryDto.prototype, "height", void 0);
//# sourceMappingURL=gallery.dto.js.map