import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
export declare class BlogsPublicController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    getAll(page?: string, limit?: string, search?: string, category?: string, status?: string): Promise<{
        message: string;
        data: import("../../database/schemas/blog.schema").BlogDocument[];
        meta: import("../../common/pagination.util").PaginationMeta;
    }>;
    getBySlug(slug: string): Promise<{
        message: string;
        data: import("../../database/schemas/blog.schema").BlogDocument;
    }>;
}
export declare class BlogsAdminController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    adminGetAll(page?: string, limit?: string, search?: string, category?: string, status?: string): Promise<{
        message: string;
        data: import("../../database/schemas/blog.schema").BlogDocument[];
        meta: import("../../common/pagination.util").PaginationMeta;
    }>;
    adminGetOne(id: string): Promise<{
        message: string;
        data: import("../../database/schemas/blog.schema").BlogDocument;
    }>;
    create(dto: CreateBlogDto, file?: Express.Multer.File): Promise<{
        message: string;
        data: import("../../database/schemas/blog.schema").BlogDocument;
    }>;
    update(id: string, dto: UpdateBlogDto, file?: Express.Multer.File): Promise<{
        message: string;
        data: import("../../database/schemas/blog.schema").BlogDocument;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: {
            success: boolean;
        };
    }>;
}
