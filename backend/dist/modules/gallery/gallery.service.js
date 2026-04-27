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
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../../common/cloudinary.service");
const pagination_util_1 = require("../../common/pagination.util");
const gallery_repository_1 = require("./gallery.repository");
let GalleryService = class GalleryService {
    constructor(repo, cloudinary) {
        this.repo = repo;
        this.cloudinary = cloudinary;
    }
    async upload(file, dto) {
        if (!file?.buffer) {
            throw new common_1.BadRequestException('Image file is required');
        }
        const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/gallery');
        const item = await this.repo.create({
            url: r.url,
            publicId: r.publicId,
            alt: dto.alt ?? '',
            caption: dto.caption ?? '',
            location: dto.location ?? '',
            height: dto.height ?? 'medium',
        });
        return {
            message: 'Image uploaded successfully',
            data: {
                id: item._id,
                imageUrl: item.url,
                caption: item.caption,
                location: item.location,
                height: item.height,
                createdAt: item.createdAt,
            },
        };
    }
    async getAll(query) {
        const { skip, limit, page } = (0, pagination_util_1.buildPagination)(query);
        const [items, total] = await Promise.all([
            this.repo.findAll({}, { skip, limit, sort: { createdAt: -1 } }),
            this.repo.count(),
        ]);
        const data = items.map((item) => ({
            id: item._id,
            imageUrl: item.url,
            caption: item.caption,
            location: item.location,
            height: item.height,
            createdAt: item.createdAt,
        }));
        return {
            message: 'Gallery retrieved successfully',
            data,
            meta: (0, pagination_util_1.buildMeta)(total, page, limit),
        };
    }
    async getById(id) {
        const item = await this.repo.findById(id);
        if (!item)
            throw new common_1.NotFoundException('Image not found');
        return {
            message: 'Image retrieved successfully',
            data: {
                id: item._id,
                imageUrl: item.url,
                caption: item.caption,
                location: item.location,
                height: item.height,
                createdAt: item.createdAt,
            },
        };
    }
    async remove(id) {
        const item = await this.repo.findById(id);
        if (!item)
            throw new common_1.NotFoundException('Image not found');
        await this.cloudinary.delete(item.publicId).catch(() => null);
        await this.repo.deleteById(id);
        return { message: 'Image deleted successfully', data: { success: true } };
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gallery_repository_1.GalleryRepository,
        cloudinary_service_1.CloudinaryService])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map