export declare class CreatePlaceDto {
    name: string;
    description: string;
    location?: string;
    region?: string;
    category?: string;
    longDescription?: string;
    rating?: number;
    altitude?: string;
    bestTime?: string;
    published?: boolean;
}
export declare class UpdatePlaceDto {
    name?: string;
    description?: string;
    location?: string;
    region?: string;
    category?: string;
    longDescription?: string;
    rating?: number;
    altitude?: string;
    bestTime?: string;
    published?: boolean;
}
