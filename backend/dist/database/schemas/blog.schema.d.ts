import { Document } from 'mongoose';
export type BlogDocument = Blog & Document;
export declare class Blog {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    coverImagePublicId: string;
    author: string;
    authorImage: string;
    authorBio: string;
    category: string;
    tags: string[];
    published: boolean;
    readTime: string;
}
export declare const BlogSchema: import("mongoose").Schema<Blog, import("mongoose").Model<Blog, any, any, any, Document<unknown, any, Blog, any, {}> & Blog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blog, Document<unknown, {}, import("mongoose").FlatRecord<Blog>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Blog> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
