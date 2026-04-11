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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const categories_repository_1 = require("./categories.repository");
const slug_util_1 = require("../../common/slug.util");
let CategoriesService = class CategoriesService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const slug = dto.slug ? dto.slug.toLowerCase().trim() : (0, slug_util_1.generateSlug)(dto.name);
        const existing = await this.repo.findOne({ slug });
        if (existing) {
            throw new common_1.ConflictException(`Category with slug "${slug}" already exists`);
        }
        const category = await this.repo.create({ ...dto, slug });
        return { message: 'Category created successfully', data: category };
    }
    async getAll(type) {
        const filter = {};
        if (type)
            filter.type = type;
        const categories = await this.repo.findAll(filter, { limit: 100 });
        return { message: 'Categories retrieved', data: categories };
    }
    async getById(id) {
        const category = await this.repo.findById(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return { message: 'Category retrieved', data: category };
    }
    async update(id, dto) {
        const exists = await this.repo.findById(id);
        if (!exists)
            throw new common_1.NotFoundException('Category not found');
        if (dto.name && !dto.slug) {
            dto.slug = (0, slug_util_1.generateSlug)(dto.name);
        }
        const updated = await this.repo.updateById(id, dto);
        return { message: 'Category updated successfully', data: updated };
    }
    async remove(id) {
        const exists = await this.repo.findById(id);
        if (!exists)
            throw new common_1.NotFoundException('Category not found');
        await this.repo.deleteById(id);
        return { message: 'Category deleted successfully', data: null };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categories_repository_1.CategoriesRepository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map