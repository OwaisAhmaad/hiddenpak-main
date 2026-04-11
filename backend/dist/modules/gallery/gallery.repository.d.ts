import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { GalleryDocument } from '../../database/schemas/gallery.schema';
export declare class GalleryRepository extends BaseRepository<GalleryDocument> {
    constructor(model: Model<GalleryDocument>);
}
