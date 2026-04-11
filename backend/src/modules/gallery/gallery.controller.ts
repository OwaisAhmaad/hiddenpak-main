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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/gallery.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { singleImageOptions } from '../../common/multer.config';

// ── Public routes ──────────────────────────────────────────────
@ApiTags('Gallery — Public')
@Controller('gallery')
export class GalleryPublicController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  @ApiOperation({ summary: 'List gallery images', description: 'Returns `{ id, imageUrl, caption, location, height }`' })
  @ApiQuery({ name: 'page',  required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({ status: 200, description: 'Paginated gallery list', schema: { example: { success: true, message: 'Gallery retrieved successfully', data: [{ id: '…', imageUrl: 'https://res.cloudinary.com/…', caption: 'Sunset over Hunza', location: 'Hunza', height: 'tall' }], meta: { total: 142, page: 1, limit: 20, pages: 8 } } } })
  getAll(
    @Query('page')  page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.galleryService.getAll({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single gallery image by ID' })
  @ApiParam({ name: 'id', description: 'Gallery item MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Gallery image found' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  getById(@Param('id') id: string) {
    return this.galleryService.getById(id);
  }
}

// ── Admin routes ────────────────────────────────────────────────
@ApiTags('Gallery — Admin')
@ApiBearerAuth('access-token')
@Controller('admin/gallery')
export class GalleryAdminController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'List ALL gallery images (admin)' })
  @ApiQuery({ name: 'page',  required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({ status: 200, description: 'Paginated gallery list', schema: { example: { success: true, data: [{ id: '…', imageUrl: '…', caption: '…', location: '…', height: 'tall' }], meta: { total: 142, page: 1, limit: 20 } } } })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  adminGetAll(
    @Query('page')  page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.galleryService.getAll({ page, limit });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get single gallery image by ID (admin)' })
  @ApiParam({ name: 'id', description: 'Gallery item MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Image found' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  adminGetById(@Param('id') id: string) {
    return this.galleryService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image', singleImageOptions))
  @ApiOperation({ summary: 'Upload gallery image', description: '`image` field (JPEG/PNG/WEBP) required. Returns `{ id, imageUrl, caption }`.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['image'],
      properties: {
        image:    { type: 'string', format: 'binary' },
        alt:      { type: 'string', example: 'Mountain sunrise' },
        caption:  { type: 'string', example: 'Golden hour over Nanga Parbat' },
        location: { type: 'string', example: 'Fairy Meadows, GB' },
        height:   { type: 'string', enum: ['tall', 'medium', 'short'], default: 'medium' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Image uploaded', schema: { example: { success: true, message: 'Image uploaded successfully', data: { id: '…', imageUrl: 'https://res.cloudinary.com/…', caption: 'Golden hour' } } } })
  @ApiResponse({ status: 400, description: 'No file or invalid file type' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  @ApiResponse({ status: 403, description: 'Not admin' })
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
  @ApiOperation({ summary: 'Delete gallery image', description: 'Removes Cloudinary file + DB record.' })
  @ApiParam({ name: 'id', description: 'Gallery item MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Deleted — returns { success: true }' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
