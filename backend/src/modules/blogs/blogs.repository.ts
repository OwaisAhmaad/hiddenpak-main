import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { Blog, BlogDocument } from '../../database/schemas/blog.schema';

@Injectable()
export class BlogsRepository extends BaseRepository<BlogDocument> {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    super(blogModel);
  }

  buildFilter(opts: {
    search?: string;
    category?: string;
    status?: string;
    published?: boolean;
  }): FilterQuery<BlogDocument> {
    const filter: FilterQuery<BlogDocument> = {};

    // published/status filter
    if (opts.status === 'published') {
      filter.published = true;
    } else if (opts.status === 'draft') {
      filter.published = false;
    } else if (opts.published !== undefined) {
      filter.published = opts.published;
    }

    // category filter — match string field OR categorySlug
    if (opts.category) {
      filter.$or = [
        { category: { $regex: opts.category, $options: 'i' } },
        { categorySlug: opts.category.toLowerCase() },
      ];
    }

    // text search with $regex (no text index required)
    if (opts.search) {
      const searchRegex = { $regex: opts.search, $options: 'i' };
      const searchFilter = {
        $or: [
          { title: searchRegex },
          { excerpt: searchRegex },
          { content: searchRegex },
          { author: searchRegex },
        ],
      };
      if (filter.$or) {
        // combine category + search with $and
        filter.$and = [{ $or: filter.$or }, searchFilter];
        delete filter.$or;
      } else {
        filter.$or = searchFilter.$or;
      }
    }

    return filter;
  }
}
