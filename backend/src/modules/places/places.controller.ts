import {
  Controller,
  Get,
  Post,
  Patch,
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
import { PlacesService } from './places.service';
import { CreatePlaceDto, UpdatePlaceDto } from './dto/place.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { singleImageOptions } from '../../common/multer.config';

// ── Public routes ──────────────────────────────────────────────
@ApiTags('Places — Public')
@Controller('places')
export class PlacesPublicController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  @ApiOperation({ summary: 'List all places', description: 'Filter by region or category.' })
  @ApiQuery({ name: 'page',     required: false, example: 1 })
  @ApiQuery({ name: 'limit',    required: false, example: 12 })
  @ApiQuery({ name: 'search',   required: false, example: 'hunza' })
  @ApiQuery({ name: 'region',   required: false, example: 'Gilgit-Baltistan' })
  @ApiQuery({ name: 'category', required: false, example: 'Mountain' })
  @ApiResponse({ status: 200, description: 'Paginated place list' })
  getAll(
    @Query('page')     page?: string,
    @Query('limit')    limit?: string,
    @Query('search')   search?: string,
    @Query('region')   region?: string,
    @Query('category') category?: string,
  ) {
    return this.placesService.getAll({ page, limit, search, region, category });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get single place by slug or ID' })
  @ApiParam({ name: 'slug', example: 'fairy-meadows' })
  @ApiResponse({ status: 200, description: 'Place found' })
  @ApiResponse({ status: 404, description: 'Place not found' })
  getBySlug(@Param('slug') slug: string) {
    return this.placesService.getBySlug(slug);
  }
}

// ── Admin routes ────────────────────────────────────────────────
@ApiTags('Places — Admin')
@ApiBearerAuth('access-token')
@Controller('admin/places')
export class PlacesAdminController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'List ALL places including drafts (admin)' })
  @ApiQuery({ name: 'page',     required: false, example: 1 })
  @ApiQuery({ name: 'limit',    required: false, example: 12 })
  @ApiQuery({ name: 'search',   required: false, example: 'hunza' })
  @ApiQuery({ name: 'region',   required: false, example: 'Gilgit-Baltistan' })
  @ApiQuery({ name: 'category', required: false, example: 'Mountain' })
  @ApiResponse({ status: 200, description: 'All places with pagination', schema: { example: { success: true, data: [{ _id: '…', name: '…', region: '…', published: false }], meta: { total: 30, page: 1, limit: 12, pages: 3 } } } })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  adminGetAll(
    @Query('page')     page?: string,
    @Query('limit')    limit?: string,
    @Query('search')   search?: string,
    @Query('region')   region?: string,
    @Query('category') category?: string,
  ) {
    return this.placesService.getAll({ page, limit, search, region, category });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get single place by ID or slug (admin)' })
  @ApiParam({ name: 'id', description: 'Place slug or MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Place found' })
  @ApiResponse({ status: 404, description: 'Place not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  adminGetOne(@Param('id') id: string) {
    return this.placesService.getBySlug(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image', singleImageOptions))
  @ApiOperation({ summary: 'Create place', description: 'Multipart form. `image` field = cover photo (JPEG/PNG/WEBP).' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'description'],
      properties: {
        name:            { type: 'string', example: 'Fairy Meadows' },
        description:     { type: 'string', example: 'Stunning alpine meadow…' },
        location:        { type: 'string', example: 'Gilgit-Baltistan, Pakistan' },
        region:          { type: 'string', example: 'Gilgit-Baltistan' },
        category:        { type: 'string', example: 'Mountain' },
        longDescription: { type: 'string' },
        altitude:        { type: 'string', example: '3,300 m' },
        bestTime:        { type: 'string', example: 'June – September' },
        rating:          { type: 'number', example: 4.8 },
        published:       { type: 'boolean', example: true },
        image:           { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Place created' })
  @ApiResponse({ status: 400, description: 'Validation error or invalid file type' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  @ApiResponse({ status: 403, description: 'Not admin' })
  create(
    @Body() dto: CreatePlaceDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.placesService.create(dto, file);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image', singleImageOptions))
  @ApiOperation({ summary: 'Update place', description: 'All fields optional. New image replaces old.' })
  @ApiParam({ name: 'id', description: 'Place MongoDB ObjectId' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name:        { type: 'string' },
        description: { type: 'string' },
        region:      { type: 'string' },
        rating:      { type: 'number' },
        published:   { type: 'boolean' },
        image:       { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Place updated' })
  @ApiResponse({ status: 404, description: 'Place not found' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePlaceDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.placesService.update(id, dto, file);
  }

  @Post(':id/gallery')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image', singleImageOptions))
  @ApiOperation({ summary: 'Add gallery image to place', description: 'Appends one image to the place gallery array.' })
  @ApiParam({ name: 'id', description: 'Place MongoDB ObjectId' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', required: ['image'], properties: { image: { type: 'string', format: 'binary' } } } })
  @ApiResponse({ status: 201, description: 'Gallery image added' })
  addGalleryImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.placesService.addGalleryImage(id, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete place', description: 'Deletes record + all Cloudinary images (cover + gallery).' })
  @ApiParam({ name: 'id', description: 'Place MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Deleted — returns { success: true }' })
  @ApiResponse({ status: 404, description: 'Place not found' })
  remove(@Param('id') id: string) {
    return this.placesService.remove(id);
  }
}
