import { CloudinaryService } from '../../common/cloudinary.service';
import { PaginationQuery } from '../../common/pagination.util';
import { CreateGalleryDto } from './dto/gallery.dto';
import { GalleryRepository } from './gallery.repository';
export declare class GalleryService {
    private repo;
    private cloudinary;
    constructor(repo: GalleryRepository, cloudinary: CloudinaryService);
    upload(file: Express.Multer.File | undefined, dto: CreateGalleryDto): Promise<{
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
    getAll(query: PaginationQuery): Promise<{
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
    remove(id: string): Promise<{
        message: string;
        data: {
            success: boolean;
        };
    }>;
}
