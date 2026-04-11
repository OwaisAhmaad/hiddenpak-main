import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesService {
    private readonly repo;
    constructor(repo: CategoriesRepository);
    create(dto: CreateCategoryDto): Promise<{
        message: string;
        data: import("../../database/schemas/category.schema").CategoryDocument;
    }>;
    getAll(type?: string): Promise<{
        message: string;
        data: import("../../database/schemas/category.schema").CategoryDocument[];
    }>;
    getById(id: string): Promise<{
        message: string;
        data: import("../../database/schemas/category.schema").CategoryDocument;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        message: string;
        data: import("../../database/schemas/category.schema").CategoryDocument;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: any;
    }>;
}
