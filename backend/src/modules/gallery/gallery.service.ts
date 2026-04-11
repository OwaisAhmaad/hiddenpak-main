import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CloudinaryService } from '../../common/cloudinary.service';
import { buildMeta, buildPagination, PaginationQuery } from '../../common/pagination.util';
import { CreateGalleryDto } from './dto/gallery.dto';
import { GalleryRepository } from './gallery.repository';

@Injectable()
export class GalleryService {
  constructor(
    private repo: GalleryRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async upload(file: Express.Multer.File | undefined, dto: CreateGalleryDto) {
    if (!file?.buffer) {
      throw new BadRequestException('Image file is required');
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

    // Return spec-compliant shape: { id, imageUrl, caption }
    return {
      message: 'Image uploaded successfully',
      data: {
        id: (item as any)._id,
        imageUrl: item.url,
        caption: item.caption,
        location: item.location,
        height: item.height,
        createdAt: (item as any).createdAt,
      },
    };
  }

  async getAll(query: PaginationQuery) {
    const { skip, limit, page } = buildPagination(query);
    const [items, total] = await Promise.all([
      this.repo.findAll({}, { skip, limit, sort: { createdAt: -1 } }),
      this.repo.count(),
    ]);
    const data = items.map((item) => ({
      id: (item as any)._id,
      imageUrl: item.url,
      caption: item.caption,
      location: item.location,
      height: item.height,
      createdAt: (item as any).createdAt,
    }));
    return {
      message: 'Gallery retrieved successfully',
      data,
      meta: buildMeta(total, page, limit),
    };
  }

  async remove(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new NotFoundException('Image not found');
    await this.cloudinary.delete(item.publicId).catch(() => null);
    await this.repo.deleteById(id);
    return { message: 'Image deleted successfully', data: { success: true } };
  }
}
