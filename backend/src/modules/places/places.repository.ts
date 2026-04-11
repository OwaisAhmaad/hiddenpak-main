import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { Place, PlaceDocument } from '../../database/schemas/place.schema';

@Injectable()
export class PlacesRepository extends BaseRepository<PlaceDocument> {
  constructor(@InjectModel(Place.name) private placeModel: Model<PlaceDocument>) {
    super(placeModel);
  }

  buildFilter(opts: {
    search?: string;
    region?: string;
    category?: string;
    published?: boolean;
  }): FilterQuery<PlaceDocument> {
    const filter: FilterQuery<PlaceDocument> = {};

    if (opts.published !== undefined) filter.published = opts.published;
    if (opts.region) filter.region = { $regex: opts.region, $options: 'i' };
    if (opts.category) filter.category = { $regex: opts.category, $options: 'i' };

    if (opts.search) {
      filter.$or = [
        { name: { $regex: opts.search, $options: 'i' } },
        { description: { $regex: opts.search, $options: 'i' } },
        { region: { $regex: opts.search, $options: 'i' } },
      ];
    }

    return filter;
  }
}
