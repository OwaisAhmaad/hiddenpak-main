import { CloudinaryService } from '../../common/cloudinary.service';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
export declare class BlogsService {
    private repo;
    private cloudinary;
    constructor(repo: BlogsRepository, cloudinary: CloudinaryService);
    create(dto: CreateBlogDto, file?: Express.Multer.File): Promise<{
        message: string;
        data: import("../../database/schemas/blog.schema").BlogDocument;
    }>;
    getAll(query: {
        page?: string;
        limit?: string;
        search?: string;
        category?: string;
        status?: string;
    }): Promise<{
        message: string;
        data: import("../../database/schemas/blog.schema").BlogDocument[];
        meta: import("../../common/pagination.util").PaginationMeta;
    }>;
    getBySlug(slug: string): Promise<{
        message: string;
        data: import("../../database/schemas/blog.schema").BlogDocument;
    }>;
    update(id: string, dto: UpdateBlogDto, file?: Express.Multer.File): Promise<{
        message: string;
        data: import("../../database/schemas/blog.schema").BlogDocument;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: any;
    }>;
}
