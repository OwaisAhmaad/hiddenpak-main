import { Document } from 'mongoose';
export type PlaceDocument = Place & Document;
export declare class Place {
    name: string;
    slug: string;
    region: string;
    category: string;
    description: string;
    longDescription: string;
    location: string;
    image: string;
    imagePublicId: string;
    gallery: string[];
    galleryPublicIds: string[];
    rating: number;
    altitude: string;
    bestTime: string;
    published: boolean;
}
export declare const PlaceSchema: import("mongoose").Schema<Place, import("mongoose").Model<Place, any, any, any, Document<unknown, any, Place, any, {}> & Place & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Place, Document<unknown, {}, import("mongoose").FlatRecord<Place>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Place> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
