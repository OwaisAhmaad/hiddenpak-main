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
exports.BlogsAdminController = exports.BlogsPublicController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const blogs_service_1 = require("./blogs.service");
const blog_dto_1 = require("./dto/blog.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const multer_config_1 = require("../../common/multer.config");
let BlogsPublicController = class BlogsPublicController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    getAll(page, limit, search, category, status) {
        return this.blogsService.getAll({ page, limit, search, category, status });
    }
    getBySlug(slug) {
        return this.blogsService.getBySlug(slug);
    }
};
exports.BlogsPublicController = BlogsPublicController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all blogs', description: 'Paginated list. Filter by category slug or status.' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, example: 'hunza' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, example: 'trekking' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['draft', 'published'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated blog list' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('category')),
    __param(4, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], BlogsPublicController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single blog by slug or ID' }),
    (0, swagger_1.ApiParam)({ name: 'slug', description: 'Blog slug (e.g. hunza-valley-spring) or MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogsPublicController.prototype, "getBySlug", null);
exports.BlogsPublicController = BlogsPublicController = __decorate([
    (0, swagger_1.ApiTags)('Blogs — Public'),
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsPublicController);
let BlogsAdminController = class BlogsAdminController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    adminGetAll(page, limit, search, category, status) {
        return this.blogsService.getAll({ page, limit, search, category, status });
    }
    adminGetOne(id) {
        return this.blogsService.getBySlug(id);
    }
    create(dto, file) {
        return this.blogsService.create(dto, file);
    }
    update(id, dto, file) {
        return this.blogsService.update(id, dto, file);
    }
    remove(id) {
        return this.blogsService.remove(id);
    }
};
exports.BlogsAdminController = BlogsAdminController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List ALL blogs including drafts (admin)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, example: 'hunza' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, example: 'trekking' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['draft', 'published'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All blogs with pagination', schema: { example: { success: true, data: [{ _id: '…', title: '…', published: false }], meta: { total: 42, page: 1, limit: 10, pages: 5 } } } }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('category')),
    __param(4, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], BlogsAdminController.prototype, "adminGetAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single blog by ID or slug (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Blog slug or MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogsAdminController.prototype, "adminGetOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('coverImage', multer_config_1.singleImageOptions)),
    (0, swagger_1.ApiOperation)({ summary: 'Create blog post', description: 'Multipart form. `coverImage` field accepts JPEG/PNG/WEBP (max 2 MB).' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['title', 'content'],
            properties: {
                title: { type: 'string', example: 'Exploring Hunza Valley' },
                content: { type: 'string', example: 'Full article content…' },
                excerpt: { type: 'string', example: 'Short teaser…' },
                category: { type: 'string', example: 'Trekking' },
                categoryId: { type: 'string', example: '64f1a2b3c4d5e6f7a8b9c0d1' },
                status: { type: 'string', enum: ['draft', 'published'], default: 'published' },
                author: { type: 'string', example: 'Ali Raza' },
                readTime: { type: 'string', example: '7 min read' },
                tags: { type: 'array', items: { type: 'string' }, example: ['hunza', 'spring'] },
                coverImage: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Blog created', schema: { example: { success: true, message: 'Blog created successfully', data: { _id: '…', title: '…', slug: 'exploring-hunza-valley', coverImage: 'https://res.cloudinary.com/…' } } } }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error or invalid file type' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Not admin' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.CreateBlogDto, Object]),
    __metadata("design:returntype", void 0)
], BlogsAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('coverImage', multer_config_1.singleImageOptions)),
    (0, swagger_1.ApiOperation)({ summary: 'Update blog post', description: 'All fields optional. New coverImage replaces old (old deleted from Cloudinary).' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Blog MongoDB ObjectId' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                content: { type: 'string' },
                excerpt: { type: 'string' },
                status: { type: 'string', enum: ['draft', 'published'] },
                coverImage: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, blog_dto_1.UpdateBlogDto, Object]),
    __metadata("design:returntype", void 0)
], BlogsAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete blog post', description: 'Deletes record and removes coverImage from Cloudinary.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Blog MongoDB ObjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Deleted — returns { success: true }' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogsAdminController.prototype, "remove", null);
exports.BlogsAdminController = BlogsAdminController = __decorate([
    (0, swagger_1.ApiTags)('Blogs — Admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('admin/blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsAdminController);
//# sourceMappingURL=blogs.controller.js.map