import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/gallery.dto';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    getAll(page?: string, limit?: string): Promise<{
        data: import("../../database/schemas/gallery.schema").GalleryDocument[];
        meta: import("../../common/pagination.util").PaginationMeta;
    }>;
    upload(file: Express.Multer.File, dto: CreateGalleryDto): Promise<import("../../database/schemas/gallery.schema").GalleryDocument>;
    remove(id: string): Promise<import("../../database/schemas/gallery.schema").GalleryDocument>;
}
