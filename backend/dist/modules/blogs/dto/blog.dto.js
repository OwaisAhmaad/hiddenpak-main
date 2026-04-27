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
exports.UpdateBlogDto = exports.CreateBlogDto = exports.BlogStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var BlogStatus;
(function (BlogStatus) {
    BlogStatus["DRAFT"] = "draft";
    BlogStatus["PUBLISHED"] = "published";
})(BlogStatus || (exports.BlogStatus = BlogStatus = {}));
class CreateBlogDto {
}
exports.CreateBlogDto = CreateBlogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Exploring Hunza Valley in Spring', minLength: 3 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'A short teaser about the blog post…' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "excerpt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Full article content goes here…', minLength: 10 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ali Raza' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Travel writer and photographer' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "authorBio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Trekking' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '64f1a2b3c4d5e6f7a8b9c0d1', description: 'MongoDB ObjectId of a Category document' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: BlogStatus, example: BlogStatus.PUBLISHED }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(BlogStatus),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true ? true
        : value === 'false' || value === false ? false
            : undefined),
    __metadata("design:type", Boolean)
], CreateBlogDto.prototype, "published", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['hunza', 'spring', 'gilgit'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return [];
        return Array.isArray(value) ? value : [value];
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateBlogDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '7 min read' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "readTime", void 0);
class UpdateBlogDto {
}
exports.UpdateBlogDto = UpdateBlogDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated title', minLength: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "excerpt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minLength: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "authorBio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: BlogStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(BlogStatus),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true ? true
        : value === 'false' || value === false ? false
            : undefined),
    __metadata("design:type", Boolean)
], UpdateBlogDto.prototype, "published", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return [];
        return Array.isArray(value) ? value : [value];
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateBlogDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "readTime", void 0);
//# sourceMappingURL=blog.dto.js.map