import { Injectable, NotFoundException } from '@nestjs/common';
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

  async upload(file: Express.Multer.File, dto: CreateGalleryDto) {
    const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/gallery');
    return this.repo.create({
      url: r.url,
      publicId: r.publicId,
      alt: dto.alt ?? '',
      location: dto.location ?? '',
      height: dto.height ?? 'medium',
    });
  }

  async getAll(query: PaginationQuery) {
    const { skip, limit, page } = buildPagination(query);
    const [data, total] = await Promise.all([
      this.repo.findAll({}, { skip, limit }),
      this.repo.count(),
    ]);
    return { data, meta: buildMeta(total, page, limit) };
  }

  async remove(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new NotFoundException('Image not found');
    await this.cloudinary.delete(item.publicId);
    return this.repo.deleteById(id);
  }
}
