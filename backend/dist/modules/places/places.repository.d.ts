import { FilterQuery, Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { PlaceDocument } from '../../database/schemas/place.schema';
export declare class PlacesRepository extends BaseRepository<PlaceDocument> {
    private placeModel;
    constructor(placeModel: Model<PlaceDocument>);
    buildFilter(opts: {
        search?: string;
        region?: string;
        category?: string;
        published?: boolean;
    }): FilterQuery<PlaceDocument>;
}
