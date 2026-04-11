import { FilterQuery, Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { BlogDocument } from '../../database/schemas/blog.schema';
export declare class BlogsRepository extends BaseRepository<BlogDocument> {
    private blogModel;
    constructor(blogModel: Model<BlogDocument>);
    buildFilter(opts: {
        search?: string;
        category?: string;
        status?: string;
        published?: boolean;
    }): FilterQuery<BlogDocument>;
}
