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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../../common/cloudinary.service");
const pagination_util_1 = require("../../common/pagination.util");
const slug_util_1 = require("../../common/slug.util");
const blogs_repository_1 = require("./blogs.repository");
let BlogsService = class BlogsService {
    constructor(repo, cloudinary) {
        this.repo = repo;
        this.cloudinary = cloudinary;
    }
    async create(dto, file) {
        const slug = (0, slug_util_1.generateSlug)(dto.title);
        const exists = await this.repo.findOne({ slug });
        if (exists)
            throw new common_1.ConflictException('Slug already exists');
        let coverImage = '';
        let coverImagePublicId = '';
        if (file?.buffer) {
            const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/blogs');
            coverImage = r.url;
            coverImagePublicId = r.publicId;
        }
        const blog = await this.repo.create({
            ...dto,
            slug,
            coverImage,
            coverImagePublicId,
        });
        return { message: 'Blog created successfully', data: blog };
    }
    async getAll(query) {
        const { skip, limit, page } = (0, pagination_util_1.buildPagination)(query);
        const filter = this.repo.buildFilter({
            search: query.search,
            category: query.category,
            status: query.status,
        });
        const [data, total] = await Promise.all([
            this.repo.findAll(filter, { skip, limit, sort: { createdAt: -1 } }),
            this.repo.count(filter),
        ]);
        return {
            message: 'Blogs retrieved successfully',
            data,
            meta: (0, pagination_util_1.buildMeta)(total, page, limit),
        };
    }
    async getBySlug(slug) {
        const blog = await this.repo.findOne({ slug });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return { message: 'Blog retrieved successfully', data: blog };
    }
    async update(id, dto, file) {
        const blog = await this.repo.findById(id);
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        const updates = { ...dto };
        if (file?.buffer) {
            if (blog.coverImagePublicId) {
                await this.cloudinary.delete(blog.coverImagePublicId);
            }
            const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/blogs');
            updates.coverImage = r.url;
            updates.coverImagePublicId = r.publicId;
        }
        if (dto.title)
            updates.slug = (0, slug_util_1.generateSlug)(dto.title);
        const updated = await this.repo.updateById(id, updates);
        return { message: 'Blog updated successfully', data: updated };
    }
    async remove(id) {
        const blog = await this.repo.findById(id);
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        if (blog.coverImagePublicId) {
            await this.cloudinary.delete(blog.coverImagePublicId);
        }
        await this.repo.deleteById(id);
        return { message: 'Blog deleted successfully', data: null };
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsRepository,
        cloudinary_service_1.CloudinaryService])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map