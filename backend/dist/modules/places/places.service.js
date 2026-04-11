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
exports.PlacesService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../../common/cloudinary.service");
const pagination_util_1 = require("../../common/pagination.util");
const slug_util_1 = require("../../common/slug.util");
const places_repository_1 = require("./places.repository");
let PlacesService = class PlacesService {
    constructor(repo, cloudinary) {
        this.repo = repo;
        this.cloudinary = cloudinary;
    }
    async create(dto, file) {
        const slug = (0, slug_util_1.generateSlug)(dto.name);
        if (await this.repo.findOne({ slug })) {
            throw new common_1.ConflictException('Place already exists');
        }
        let image = '';
        let imagePublicId = '';
        if (file) {
            const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/places');
            image = r.url;
            imagePublicId = r.publicId;
        }
        return this.repo.create({ ...dto, slug, image, imagePublicId });
    }
    async getAll(query) {
        const { skip, limit, page } = (0, pagination_util_1.buildPagination)(query);
        const filter = this.repo.buildFilter(query);
        const [data, total] = await Promise.all([
            this.repo.findAll(filter, { skip, limit }),
            this.repo.count(filter),
        ]);
        return { data, meta: (0, pagination_util_1.buildMeta)(total, page, limit) };
    }
    async getBySlug(slug) {
        const place = await this.repo.findOne({ slug, published: true });
        if (!place)
            throw new common_1.NotFoundException('Place not found');
        return place;
    }
    async update(id, dto, file) {
        const place = await this.repo.findById(id);
        if (!place)
            throw new common_1.NotFoundException('Place not found');
        const updates = { ...dto };
        if (file) {
            if (place.imagePublicId)
                await this.cloudinary.delete(place.imagePublicId);
            const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/places');
            updates.image = r.url;
            updates.imagePublicId = r.publicId;
        }
        if (dto.name)
            updates.slug = (0, slug_util_1.generateSlug)(dto.name);
        return this.repo.updateById(id, updates);
    }
    async addGalleryImage(id, file) {
        const place = await this.repo.findById(id);
        if (!place)
            throw new common_1.NotFoundException('Place not found');
        const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/places/gallery');
        return this.repo.updateById(id, {
            $push: {
                gallery: r.url,
                galleryPublicIds: r.publicId,
            },
        });
    }
    async remove(id) {
        const place = await this.repo.findById(id);
        if (!place)
            throw new common_1.NotFoundException('Place not found');
        if (place.imagePublicId)
            await this.cloudinary.delete(place.imagePublicId);
        for (const pid of place.galleryPublicIds) {
            await this.cloudinary.delete(pid);
        }
        return this.repo.deleteById(id);
    }
};
exports.PlacesService = PlacesService;
exports.PlacesService = PlacesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [places_repository_1.PlacesRepository,
        cloudinary_service_1.CloudinaryService])
], PlacesService);
//# sourceMappingURL=places.service.js.map