import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/gallery.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { singleImageOptions } from '../../common/multer.config';

// ── Public routes ──────────────────────────────────────────────
@Controller('gallery')
export class GalleryPublicController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.galleryService.getAll({ page, limit });
  }
}

// ── Admin routes ────────────────────────────────────────────────
@Controller('admin/gallery')
export class GalleryAdminController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image', singleImageOptions))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateGalleryDto,
  ) {
    return this.galleryService.upload(file, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
