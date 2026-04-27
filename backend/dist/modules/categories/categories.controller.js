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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("./categories.service");
const category_dto_1 = require("./dto/category.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    getAll(type) {
        return this.categoriesService.getAll(type);
    }
    create(dto) {
        return this.categoriesService.create(dto);
    }
    update(id, dto) {
        return this.categoriesService.update(id, dto);
    }
    remove(id) {
        return this.categoriesService.remove(id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiTags)('Categories — Public'),
    (0, swagger_1.ApiOperation)({ summary: 'List all categories', description: 'Returns all categories. Filter by type using the optional query param.' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['village', 'city', 'other'], description: 'Filter by category type' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of categories',
        schema: {
            example: {
                success: true,
                message: 'OK',
                data: [
                    { _id: '64f...', name: 'Mountains', slug: 'mountains', type: 'other', description: 'Scenic peaks', createdAt: '2024-01-01T00:00:00.000Z' },
                ],
            },
        },
    }),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('admin/categories'),
    (0, swagger_1.ApiTags)('Categories — Admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a category (admin)' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Category created',
        schema: {
            example: {
                success: true,
                message: 'Category created successfully',
                data: { _id: '64f...', name: 'Mountains', slug: 'mountains', type: 'other', description: '' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('admin/categories/:id'),
    (0, swagger_1.ApiTags)('Categories — Admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a category (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'MongoDB ObjectId of the category' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Category updated',
        schema: {
            example: {
                success: true,
                message: 'Category updated successfully',
                data: { _id: '64f...', name: 'Valleys', slug: 'valleys', type: 'village', description: 'Beautiful valleys' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('admin/categories/:id'),
    (0, swagger_1.ApiTags)('Categories — Admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a category (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'MongoDB ObjectId of the category' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Category deleted',
        schema: {
            example: {
                success: true,
                message: 'Category deleted successfully',
                data: { success: true },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map