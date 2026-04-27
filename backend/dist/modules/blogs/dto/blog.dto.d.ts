export declare enum BlogStatus {
    DRAFT = "draft",
    PUBLISHED = "published"
}
export declare class CreateBlogDto {
    title: string;
    excerpt?: string;
    content: string;
    author?: string;
    authorBio?: string;
    category?: string;
    categoryId?: string;
    status?: BlogStatus;
    published?: boolean;
    tags?: string[];
    readTime?: string;
}
export declare class UpdateBlogDto {
    title?: string;
    excerpt?: string;
    content?: string;
    author?: string;
    authorBio?: string;
    category?: string;
    categoryId?: string;
    status?: BlogStatus;
    published?: boolean;
    tags?: string[];
    readTime?: string;
}
