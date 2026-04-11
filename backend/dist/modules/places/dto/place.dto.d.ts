export declare class CreatePlaceDto {
    name: string;
    region: string;
    category: string;
    description: string;
    longDescription: string;
    rating?: number;
    altitude?: string;
    bestTime?: string;
    published?: boolean;
}
export declare class UpdatePlaceDto extends CreatePlaceDto {
}
