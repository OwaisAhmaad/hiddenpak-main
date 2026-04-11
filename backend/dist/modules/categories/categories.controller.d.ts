import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getAll(type?: string): Promise<{
        message: string;
        data: import("../../database/schemas/category.schema").CategoryDocument[];
    }>;
    create(dto: CreateCategoryDto): Promise<{
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
