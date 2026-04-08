import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { Gallery, GalleryDocument } from '../../database/schemas/gallery.schema';

@Injectable()
export class GalleryRepository extends BaseRepository<GalleryDocument> {
  constructor(@InjectModel(Gallery.name) model: Model<GalleryDocument>) {
    super(model);
  }
}
