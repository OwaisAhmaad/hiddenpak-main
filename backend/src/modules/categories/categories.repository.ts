import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { Category, CategoryDocument } from '../../database/schemas/category.schema';

@Injectable()
export class CategoriesRepository extends BaseRepository<CategoryDocument> {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }
}
