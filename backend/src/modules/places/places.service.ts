import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CloudinaryService } from '../../common/cloudinary.service';
import {
  buildMeta,
  buildPagination,
  PaginationQuery,
} from '../../common/pagination.util';
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
      throw new ConflictException('Place already exists');
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

  async getAll(
    query: PaginationQuery & { region?: string; category?: string },
  ) {
    const { skip, limit, page } = buildPagination(query);
    const filter = this.repo.buildFilter(query);
    const [data, total] = await Promise.all([
      this.repo.findAll(filter, { skip, limit }),
      this.repo.count(filter),
    ]);
    return { data, meta: buildMeta(total, page, limit) };
  }

  async getBySlug(slug: string) {
    const place = await this.repo.findOne({ slug, published: true });
    if (!place) throw new NotFoundException('Place not found');
    return place;
  }

  async update(id: string, dto: UpdatePlaceDto, file?: Express.Multer.File) {
    const place = await this.repo.findById(id);
    if (!place) throw new NotFoundException('Place not found');
    const updates: any = { ...dto };
    if (file) {
      if (place.imagePublicId) await this.cloudinary.delete(place.imagePublicId);
      const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/places');
      updates.image = r.url;
      updates.imagePublicId = r.publicId;
    }
    if (dto.name) updates.slug = generateSlug(dto.name);
    return this.repo.updateById(id, updates);
  }

  async addGalleryImage(id: string, file: Express.Multer.File) {
    const place = await this.repo.findById(id);
    if (!place) throw new NotFoundException('Place not found');
    const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/places/gallery');
    return this.repo.updateById(id, {
      $push: {
        gallery: r.url,
        galleryPublicIds: r.publicId,
      },
    });
  }

  async remove(id: string) {
    const place = await this.repo.findById(id);
    if (!place) throw new NotFoundException('Place not found');
    if (place.imagePublicId) await this.cloudinary.delete(place.imagePublicId);
    for (const pid of place.galleryPublicIds) {
      await this.cloudinary.delete(pid);
    }
    return this.repo.deleteById(id);
  }
}
