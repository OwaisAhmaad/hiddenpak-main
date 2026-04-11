export declare class CreateBlogDto {
    title: string;
    excerpt: string;
    content: string;
    author?: string;
    authorImage?: string;
    authorBio?: string;
    category: string;
    tags?: string[];
    published?: boolean;
    readTime?: string;
}
export declare class UpdateBlogDto {
    title?: string;
    excerpt?: string;
    content?: string;
    author?: string;
    authorImage?: string;
    authorBio?: string;
    category?: string;
    tags?: string[];
    published?: boolean;
    readTime?: string;
}
