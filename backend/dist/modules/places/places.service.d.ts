import { CloudinaryService } from '../../common/cloudinary.service';
import { PaginationQuery } from '../../common/pagination.util';
import { CreatePlaceDto, UpdatePlaceDto } from './dto/place.dto';
import { PlacesRepository } from './places.repository';
export declare class PlacesService {
    private repo;
    private cloudinary;
    constructor(repo: PlacesRepository, cloudinary: CloudinaryService);
    create(dto: CreatePlaceDto, file?: Express.Multer.File): Promise<{
        message: string;
        data: import("../../database/schemas/place.schema").PlaceDocument;
    }>;
    getAll(query: PaginationQuery & {
        region?: string;
        category?: string;
    }): Promise<{
        message: string;
        data: import("../../database/schemas/place.schema").PlaceDocument[];
        meta: import("../../common/pagination.util").PaginationMeta;
    }>;
    getBySlug(slugOrId: string): Promise<{
        message: string;
        data: import("../../database/schemas/place.schema").PlaceDocument;
    }>;
    update(id: string, dto: UpdatePlaceDto, file?: Express.Multer.File): Promise<{
        message: string;
        data: import("../../database/schemas/place.schema").PlaceDocument;
    }>;
    addGalleryImage(id: string, file: Express.Multer.File): Promise<{
        message: string;
        data: import("../../database/schemas/place.schema").PlaceDocument;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: {
            success: boolean;
        };
    }>;
}
