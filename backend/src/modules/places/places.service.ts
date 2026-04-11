import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CloudinaryService } from '../../common/cloudinary.service';
import { buildMeta, buildPagination, PaginationQuery } from '../../common/pagination.util';
import { generateSlug } from '../../common/slug.util';
import { CreatePlaceDto, UpdatePlaceDto } from './dto/place.dto';
import { PlacesRepository } from './places.repository';

@Injectable()
export class PlacesService {
  constructor(
    private repo: PlacesRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async create(dto: CreatePlaceDto, file?: Express.Multer.File) {
    const slug = generateSlug(dto.name);
    if (await this.repo.findOne({ slug })) {
      throw new ConflictException(`Place "${dto.name}" already exists`);
    }
    let image = '';
    let imagePublicId = '';
    if (file?.buffer) {
      const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/places');
      image = r.url;
      imagePublicId = r.publicId;
    }
    const place = await this.repo.create({ ...dto, slug, image, imagePublicId });
    return { message: 'Place created successfully', data: place };
  }

  async getAll(query: PaginationQuery & { region?: string; category?: string }) {
    const { skip, limit, page } = buildPagination(query);
    const filter = this.repo.buildFilter(query);
    const [data, total] = await Promise.all([
      this.repo.findAll(filter, { skip, limit, sort: { createdAt: -1 } }),
      this.repo.count(filter),
    ]);
    return {
      message: 'Places retrieved successfully',
      data,
      meta: buildMeta(total, page, limit),
    };
  }

  async getBySlug(slugOrId: string) {
    let place = await this.repo.findOne({ slug: slugOrId });
    if (!place) place = await this.repo.findById(slugOrId).catch(() => null);
    if (!place) throw new NotFoundException('Place not found');
    return { message: 'Place retrieved successfully', data: place };
  }

  async update(id: string, dto: UpdatePlaceDto, file?: Express.Multer.File) {
    const place = await this.repo.findById(id);
    if (!place) throw new NotFoundException('Place not found');
    const updates: Record<string, any> = { ...dto };
    if (file?.buffer) {
      if (place.imagePublicId) {
        await this.cloudinary.delete(place.imagePublicId).catch(() => null);
      }
      const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/places');
      updates.image = r.url;
      updates.imagePublicId = r.publicId;
    }
    if (dto.name) updates.slug = generateSlug(dto.name);
    const updated = await this.repo.updateById(id, updates);
    return { message: 'Place updated successfully', data: updated };
  }

  async addGalleryImage(id: string, file: Express.Multer.File) {
    const place = await this.repo.findById(id);
    if (!place) throw new NotFoundException('Place not found');
    const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/places/gallery');
    const updated = await this.repo.updateById(id, {
      $push: { gallery: r.url, galleryPublicIds: r.publicId },
    });
    return { message: 'Gallery image added', data: updated };
  }

  async remove(id: string) {
    const place = await this.repo.findById(id);
    if (!place) throw new NotFoundException('Place not found');
    if (place.imagePublicId) {
      await this.cloudinary.delete(place.imagePublicId).catch(() => null);
    }
    for (const pid of place.galleryPublicIds ?? []) {
      await this.cloudinary.delete(pid).catch(() => null);
    }
    await this.repo.deleteById(id);
    return { message: 'Place deleted successfully', data: { success: true } };
  }
}
