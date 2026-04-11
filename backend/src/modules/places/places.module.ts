import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from '../../common/cloudinary.service';
import { Place, PlaceSchema } from '../../database/schemas/place.schema';
import { PlacesAdminController, PlacesPublicController } from './places.controller';
import { PlacesRepository } from './places.repository';
import { PlacesService } from './places.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }]),
  ],
  controllers: [PlacesPublicController, PlacesAdminController],
  providers: [PlacesService, PlacesRepository, CloudinaryService],
})
export class PlacesModule {}
