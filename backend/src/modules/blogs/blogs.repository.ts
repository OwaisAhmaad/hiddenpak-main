import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { Blog, BlogDocument } from '../../database/schemas/blog.schema';

@Injectable()
export class BlogsRepository extends BaseRepository<BlogDocument> {
  constructor(@InjectModel(Blog.name) model: Model<BlogDocument>) {
    super(model);
  }

  searchFilter(
    search?: string,
    category?: string,
  ): FilterQuery<BlogDocument> {
    const filter: FilterQuery<BlogDocument> = { published: true };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) filter.category = { $regex: category, $options: 'i' };
    return filter;
  }
}
