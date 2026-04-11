import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { CategoryDocument } from '../../database/schemas/category.schema';
export declare class CategoriesRepository extends BaseRepository<CategoryDocument> {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
}
