import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from '../../common/cloudinary.service';
import { Blog, BlogSchema } from '../../database/schemas/blog.schema';
import { BlogsAdminController, BlogsPublicController } from './blogs.controller';
import { BlogsRepository } from './blogs.repository';
import { BlogsService } from './blogs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogsPublicController, BlogsAdminController],
  providers: [BlogsService, BlogsRepository, CloudinaryService],
})
export class BlogsModule {}
