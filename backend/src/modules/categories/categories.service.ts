import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { generateSlug } from '../../common/slug.util';

@Injectable()
export class CategoriesService {
  constructor(private readonly repo: CategoriesRepository) {}

  async create(dto: CreateCategoryDto) {
    const slug = dto.slug ? dto.slug.toLowerCase().trim() : generateSlug(dto.name);
    const existing = await this.repo.findOne({ slug });
    if (existing) {
      throw new ConflictException(`Category with slug "${slug}" already exists`);
    }
    const category = await this.repo.create({ ...dto, slug });
    return { message: 'Category created successfully', data: category };
  }

  async getAll(type?: string) {
    const filter: Record<string, any> = {};
    if (type) filter.type = type;
    const categories = await this.repo.findAll(filter, { limit: 100 });
    return { message: 'Categories retrieved', data: categories };
  }

  async getById(id: string) {
    const category = await this.repo.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return { message: 'Category retrieved', data: category };
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundException('Category not found');

    if (dto.name && !dto.slug) {
      dto.slug = generateSlug(dto.name);
    }

    const updated = await this.repo.updateById(id, dto);
    return { message: 'Category updated successfully', data: updated };
  }

  async remove(id: string) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundException('Category not found');
    await this.repo.deleteById(id);
    return { message: 'Category deleted successfully', data: null };
  }
}
