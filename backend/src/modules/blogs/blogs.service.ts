import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CloudinaryService } from '../../common/cloudinary.service';
import {
  buildMeta,
  buildPagination,
  PaginationQuery,
} from '../../common/pagination.util';
import { generateSlug } from '../../common/slug.util';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    private repo: BlogsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async create(dto: CreateBlogDto, file?: Express.Multer.File) {
    const slug = generateSlug(dto.title);
    const exists = await this.repo.findOne({ slug });
    if (exists) throw new ConflictException('Slug already exists');

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

  async getAll(query: PaginationQuery & { category?: string }) {
    const { skip, limit, page } = buildPagination(query);
    const filter = this.repo.searchFilter(query.search, query.category);
    const [data, total] = await Promise.all([
      this.repo.findAll(filter, { skip, limit }),
      this.repo.count(filter),
    ]);
    return { message: 'OK', data, meta: buildMeta(total, page, limit) };
  }

  async getBySlug(slug: string) {
    const blog = await this.repo.findOne({ slug, published: true });
    if (!blog) throw new NotFoundException('Blog not found');
    return { message: 'OK', data: blog };
  }

  async update(id: string, dto: UpdateBlogDto, file?: Express.Multer.File) {
    const blog = await this.repo.findById(id);
    if (!blog) throw new NotFoundException('Blog not found');

    const updates: any = { ...dto };

    if (file?.buffer) {
      if (blog.coverImagePublicId) {
        await this.cloudinary.delete(blog.coverImagePublicId);
      }
      const r = await this.cloudinary.upload(file.buffer, 'hiddenpak/blogs');
      updates.coverImage = r.url;
      updates.coverImagePublicId = r.publicId;
    }

    if (dto.title) updates.slug = generateSlug(dto.title);

    const updated = await this.repo.updateById(id, updates);
    return { message: 'Blog updated successfully', data: updated };
  }

  async remove(id: string) {
    const blog = await this.repo.findById(id);
    if (!blog) throw new NotFoundException('Blog not found');
    if (blog.coverImagePublicId) {
      await this.cloudinary.delete(blog.coverImagePublicId);
    }
    await this.repo.deleteById(id);
    return { message: 'Blog deleted successfully', data: null };
  }
}
