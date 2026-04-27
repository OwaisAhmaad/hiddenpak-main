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
exports.GalleryAdminController = exports.GalleryPublicController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const gallery_service_1 = require("./gallery.service");
const gallery_dto_1 = require("./dto/gallery.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const multer_config_1 = require("../../common/multer.config");
let GalleryPublicController = class GalleryPublicController {
    constructor(galleryService) {
        this.galleryService = galleryService;
    }
    getAll(page, limit) {
        return this.galleryService.getAll({ page, limit });
    }
    getById(id) {
        return this.galleryService.getById(id);
    }
};
exports.GalleryPublicController = GalleryPublicController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List gallery images', description: 'Returns `{ id, imageUrl, caption, location, height }`' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated gallery list', schema: { example: { success: true, message: 'Gallery retrieved successfully', data: [{ id: '…', imageUrl: 'https://res.cloudinary.com/…', caption: 'Sunset over Hunza', location: 'Hunza', height: 'tall' }], meta: { total: 142, page: 1, limit: 20, pages: 8 } } } }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GalleryPublicController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single gallery image by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Gallery item MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Gallery image found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GalleryPublicController.prototype, "getById", null);
exports.GalleryPublicController = GalleryPublicController = __decorate([
    (0, swagger_1.ApiTags)('Gallery — Public'),
    (0, common_1.Controller)('gallery'),
    __metadata("design:paramtypes", [gallery_service_1.GalleryService])
], GalleryPublicController);
let GalleryAdminController = class GalleryAdminController {
    constructor(galleryService) {
        this.galleryService = galleryService;
    }
    adminGetAll(page, limit) {
        return this.galleryService.getAll({ page, limit });
    }
    adminGetById(id) {
        return this.galleryService.getById(id);
    }
    upload(file, dto) {
        return this.galleryService.upload(file, dto);
    }
    remove(id) {
        return this.galleryService.remove(id);
    }
};
exports.GalleryAdminController = GalleryAdminController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List ALL gallery images (admin)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated gallery list', schema: { example: { success: true, data: [{ id: '…', imageUrl: '…', caption: '…', location: '…', height: 'tall' }], meta: { total: 142, page: 1, limit: 20 } } } }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GalleryAdminController.prototype, "adminGetAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single gallery image by ID (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Gallery item MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GalleryAdminController.prototype, "adminGetById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_config_1.singleImageOptions)),
    (0, swagger_1.ApiOperation)({ summary: 'Upload gallery image', description: '`image` field (JPEG/PNG/WEBP) required. Returns `{ id, imageUrl, caption }`.' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['image'],
            properties: {
                image: { type: 'string', format: 'binary' },
                alt: { type: 'string', example: 'Mountain sunrise' },
                caption: { type: 'string', example: 'Golden hour over Nanga Parbat' },
                location: { type: 'string', example: 'Fairy Meadows, GB' },
                height: { type: 'string', enum: ['tall', 'medium', 'short'], default: 'medium' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Image uploaded', schema: { example: { success: true, message: 'Image uploaded successfully', data: { id: '…', imageUrl: 'https://res.cloudinary.com/…', caption: 'Golden hour' } } } }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'No file or invalid file type' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Not admin' }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, gallery_dto_1.CreateGalleryDto]),
    __metadata("design:returntype", void 0)
], GalleryAdminController.prototype, "upload", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete gallery image', description: 'Removes Cloudinary file + DB record.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Gallery item MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Deleted — returns { success: true }' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GalleryAdminController.prototype, "remove", null);
exports.GalleryAdminController = GalleryAdminController = __decorate([
    (0, swagger_1.ApiTags)('Gallery — Admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('admin/gallery'),
    __metadata("design:paramtypes", [gallery_service_1.GalleryService])
], GalleryAdminController);
//# sourceMappingURL=gallery.controller.js.map