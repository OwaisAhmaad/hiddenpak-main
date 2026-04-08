import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { Place, PlaceDocument } from '../../database/schemas/place.schema';

@Injectable()
export class PlacesRepository extends BaseRepository<PlaceDocument> {
  constructor(@InjectModel(Place.name) model: Model<PlaceDocument>) {
    super(model);
  }

  buildFilter(opts: {
    search?: string;
    region?: string;
    category?: string;
  }): FilterQuery<PlaceDocument> {
    const filter: FilterQuery<PlaceDocument> = { published: true };
    if (opts.search) filter.$text = { $search: opts.search };
    if (opts.region) filter.region = opts.region;
    if (opts.category) filter.category = opts.category;
    return filter;
  }
}
