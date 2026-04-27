import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/gallery.dto';
export declare class GalleryPublicController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    getAll(page?: string, limit?: string): Promise<{
        message: string;
        data: {
            id: any;
            imageUrl: string;
            caption: string;
            location: string;
            height: string;
            createdAt: any;
        }[];
        meta: import("../../common/pagination.util").PaginationMeta;
    }>;
    getById(id: string): Promise<{
        message: string;
        data: {
            id: any;
            imageUrl: string;
            caption: string;
            location: string;
            height: string;
            createdAt: any;
        };
    }>;
}
export declare class GalleryAdminController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    adminGetAll(page?: string, limit?: string): Promise<{
        message: string;
        data: {
            id: any;
            imageUrl: string;
            caption: string;
            location: string;
            height: string;
            createdAt: any;
        }[];
        meta: import("../../common/pagination.util").PaginationMeta;
    }>;
    adminGetById(id: string): Promise<{
        message: string;
        data: {
            id: any;
            imageUrl: string;
            caption: string;
            location: string;
            height: string;
            createdAt: any;
        };
    }>;
    upload(file: Express.Multer.File, dto: CreateGalleryDto): Promise<{
        message: string;
        data: {
            id: any;
            imageUrl: string;
            caption: string;
            location: string;
            height: string;
            createdAt: any;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: {
            success: boolean;
        };
    }>;
}
