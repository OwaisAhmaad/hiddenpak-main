import { CloudinaryService } from '../../common/cloudinary.service';
import { PaginationQuery } from '../../common/pagination.util';
import { CreateGalleryDto } from './dto/gallery.dto';
import { GalleryRepository } from './gallery.repository';
export declare class GalleryService {
    private repo;
    private cloudinary;
    constructor(repo: GalleryRepository, cloudinary: CloudinaryService);
    upload(file: Express.Multer.File, dto: CreateGalleryDto): Promise<import("../../database/schemas/gallery.schema").GalleryDocument>;
    getAll(query: PaginationQuery): Promise<{
        data: import("../../database/schemas/gallery.schema").GalleryDocument[];
        meta: import("../../common/pagination.util").PaginationMeta;
    }>;
    remove(id: string): Promise<import("../../database/schemas/gallery.schema").GalleryDocument>;
}
