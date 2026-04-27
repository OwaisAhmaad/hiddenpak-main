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
exports.PlacesAdminController = exports.PlacesPublicController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const places_service_1 = require("./places.service");
const place_dto_1 = require("./dto/place.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const multer_config_1 = require("../../common/multer.config");
let PlacesPublicController = class PlacesPublicController {
    constructor(placesService) {
        this.placesService = placesService;
    }
    getAll(page, limit, search, region, category) {
        return this.placesService.getAll({ page, limit, search, region, category });
    }
    getBySlug(slug) {
        return this.placesService.getBySlug(slug);
    }
};
exports.PlacesPublicController = PlacesPublicController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all places', description: 'Filter by region or category.' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 12 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, example: 'hunza' }),
    (0, swagger_1.ApiQuery)({ name: 'region', required: false, example: 'Gilgit-Baltistan' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, example: 'Mountain' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated place list' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('region')),
    __param(4, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], PlacesPublicController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single place by slug or ID' }),
    (0, swagger_1.ApiParam)({ name: 'slug', example: 'fairy-meadows' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Place found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Place not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacesPublicController.prototype, "getBySlug", null);
exports.PlacesPublicController = PlacesPublicController = __decorate([
    (0, swagger_1.ApiTags)('Places — Public'),
    (0, common_1.Controller)('places'),
    __metadata("design:paramtypes", [places_service_1.PlacesService])
], PlacesPublicController);
let PlacesAdminController = class PlacesAdminController {
    constructor(placesService) {
        this.placesService = placesService;
    }
    adminGetAll(page, limit, search, region, category) {
        return this.placesService.getAll({ page, limit, search, region, category });
    }
    adminGetOne(id) {
        return this.placesService.getBySlug(id);
    }
    create(dto, file) {
        return this.placesService.create(dto, file);
    }
    update(id, dto, file) {
        return this.placesService.update(id, dto, file);
    }
    addGalleryImage(id, file) {
        return this.placesService.addGalleryImage(id, file);
    }
    remove(id) {
        return this.placesService.remove(id);
    }
};
exports.PlacesAdminController = PlacesAdminController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List ALL places including drafts (admin)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 12 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, example: 'hunza' }),
    (0, swagger_1.ApiQuery)({ name: 'region', required: false, example: 'Gilgit-Baltistan' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, example: 'Mountain' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All places with pagination', schema: { example: { success: true, data: [{ _id: '…', name: '…', region: '…', published: false }], meta: { total: 30, page: 1, limit: 12, pages: 3 } } } }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('region')),
    __param(4, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], PlacesAdminController.prototype, "adminGetAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single place by ID or slug (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Place slug or MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Place found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Place not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacesAdminController.prototype, "adminGetOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_config_1.singleImageOptions)),
    (0, swagger_1.ApiOperation)({ summary: 'Create place', description: 'Multipart form. `image` field = cover photo (JPEG/PNG/WEBP).' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['name', 'description'],
            properties: {
                name: { type: 'string', example: 'Fairy Meadows' },
                description: { type: 'string', example: 'Stunning alpine meadow…' },
                location: { type: 'string', example: 'Gilgit-Baltistan, Pakistan' },
                region: { type: 'string', example: 'Gilgit-Baltistan' },
                category: { type: 'string', example: 'Mountain' },
                longDescription: { type: 'string' },
                altitude: { type: 'string', example: '3,300 m' },
                bestTime: { type: 'string', example: 'June – September' },
                rating: { type: 'number', example: 4.8 },
                published: { type: 'boolean', example: true },
                image: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Place created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error or invalid file type' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Not admin' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_dto_1.CreatePlaceDto, Object]),
    __metadata("design:returntype", void 0)
], PlacesAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_config_1.singleImageOptions)),
    (0, swagger_1.ApiOperation)({ summary: 'Update place', description: 'All fields optional. New image replaces old.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Place MongoDB ObjectId' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                region: { type: 'string' },
                rating: { type: 'number' },
                published: { type: 'boolean' },
                image: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Place updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Place not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, place_dto_1.UpdatePlaceDto, Object]),
    __metadata("design:returntype", void 0)
], PlacesAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/gallery'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_config_1.singleImageOptions)),
    (0, swagger_1.ApiOperation)({ summary: 'Add gallery image to place', description: 'Appends one image to the place gallery array.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Place MongoDB ObjectId' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ schema: { type: 'object', required: ['image'], properties: { image: { type: 'string', format: 'binary' } } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Gallery image added' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PlacesAdminController.prototype, "addGalleryImage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete place', description: 'Deletes record + all Cloudinary images (cover + gallery).' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Place MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Deleted — returns { success: true }' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Place not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacesAdminController.prototype, "remove", null);
exports.PlacesAdminController = PlacesAdminController = __decorate([
    (0, swagger_1.ApiTags)('Places — Admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('admin/places'),
    __metadata("design:paramtypes", [places_service_1.PlacesService])
], PlacesAdminController);
//# sourceMappingURL=places.controller.js.map