import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from '../../common/cloudinary.service';
import { Gallery, GallerySchema } from '../../database/schemas/gallery.schema';
import { GalleryController } from './gallery.controller';
import { GalleryRepository } from './gallery.repository';
import { GalleryService } from './gallery.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Gallery.name, schema: GallerySchema },
    ]),
  ],
  controllers: [GalleryController],
  providers: [GalleryService, GalleryRepository, CloudinaryService],
})
export class GalleryModule {}
