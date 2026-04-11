import { Document } from 'mongoose';
export type SettingsDocument = Settings & Document;
export declare class Settings {
    siteName: string;
    siteTagline: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    facebookUrl: string;
    instagramUrl: string;
    twitterUrl: string;
    youtubeUrl: string;
    maintenanceMode: boolean;
    allowRegistration: boolean;
}
export declare const SettingsSchema: import("mongoose").Schema<Settings, import("mongoose").Model<Settings, any, any, any, Document<unknown, any, Settings, any, {}> & Settings & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Settings, Document<unknown, {}, import("mongoose").FlatRecord<Settings>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Settings> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
