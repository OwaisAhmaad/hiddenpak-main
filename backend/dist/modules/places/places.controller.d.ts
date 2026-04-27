import { PlacesService } from './places.service';
import { CreatePlaceDto, UpdatePlaceDto } from './dto/place.dto';
export declare class PlacesPublicController {
    private readonly placesService;
    constructor(placesService: PlacesService);
    getAll(page?: string, limit?: string, search?: string, region?: string, category?: string): Promise<{
        message: string;
        data: import("../../database/schemas/place.schema").PlaceDocument[];
        meta: import("../../common/pagination.util").PaginationMeta;
    }>;
    getBySlug(slug: string): Promise<{
        message: string;
        data: import("../../database/schemas/place.schema").PlaceDocument;
    }>;
}
export declare class PlacesAdminController {
    private readonly placesService;
    constructor(placesService: PlacesService);
    adminGetAll(page?: string, limit?: string, search?: string, region?: string, category?: string): Promise<{
        message: string;
        data: import("../../database/schemas/place.schema").PlaceDocument[];
        meta: import("../../common/pagination.util").PaginationMeta;
    }>;
    adminGetOne(id: string): Promise<{
        message: string;
        data: import("../../database/schemas/place.schema").PlaceDocument;
    }>;
    create(dto: CreatePlaceDto, file?: Express.Multer.File): Promise<{
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
