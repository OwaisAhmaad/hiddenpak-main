import { CategoryType } from '../../../database/schemas/category.schema';
export declare class CreateCategoryDto {
    name: string;
    slug?: string;
    type: CategoryType;
    description?: string;
}
export declare class UpdateCategoryDto {
    name?: string;
    slug?: string;
    type?: CategoryType;
    description?: string;
}
