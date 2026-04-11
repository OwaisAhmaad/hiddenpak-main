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
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { singleImageOptions } from '../../common/multer.config';

// ── Public routes ──────────────────────────────────────────────
@ApiTags('Blogs — Public')
@Controller('blogs')
export class BlogsPublicController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @ApiOperation({ summary: 'List all blogs', description: 'Paginated list. Filter by category slug or status.' })
  @ApiQuery({ name: 'page',     required: false, example: 1 })
  @ApiQuery({ name: 'limit',    required: false, example: 10 })
  @ApiQuery({ name: 'search',   required: false, example: 'hunza' })
  @ApiQuery({ name: 'category', required: false, example: 'trekking' })
  @ApiQuery({ name: 'status',   required: false, enum: ['draft', 'published'] })
  @ApiResponse({ status: 200, description: 'Paginated blog list' })
  getAll(
    @Query('page')     page?: string,
    @Query('limit')    limit?: string,
    @Query('search')   search?: string,
    @Query('category') category?: string,
    @Query('status')   status?: string,
  ) {
    return this.blogsService.getAll({ page, limit, search, category, status });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get single blog by slug or ID' })
  @ApiParam({ name: 'slug', description: 'Blog slug (e.g. hunza-valley-spring) or MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Blog found' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  getBySlug(@Param('slug') slug: string) {
    return this.blogsService.getBySlug(slug);
  }
}

// ── Admin routes ────────────────────────────────────────────────
@ApiTags('Blogs — Admin')
@ApiBearerAuth('access-token')
@Controller('admin/blogs')
export class BlogsAdminController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('coverImage', singleImageOptions))
  @ApiOperation({ summary: 'Create blog post', description: 'Multipart form. `coverImage` field accepts JPEG/PNG/WEBP (max 2 MB).' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'content'],
      properties: {
        title:       { type: 'string', example: 'Exploring Hunza Valley' },
        content:     { type: 'string', example: 'Full article content…' },
        excerpt:     { type: 'string', example: 'Short teaser…' },
        category:    { type: 'string', example: 'Trekking' },
        categoryId:  { type: 'string', example: '64f1a2b3c4d5e6f7a8b9c0d1' },
        status:      { type: 'string', enum: ['draft', 'published'], default: 'published' },
        author:      { type: 'string', example: 'Ali Raza' },
        readTime:    { type: 'string', example: '7 min read' },
        tags:        { type: 'array', items: { type: 'string' }, example: ['hunza', 'spring'] },
        coverImage:  { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Blog created', schema: { example: { success: true, message: 'Blog created successfully', data: { _id: '…', title: '…', slug: 'exploring-hunza-valley', coverImage: 'https://res.cloudinary.com/…' } } } })
  @ApiResponse({ status: 400, description: 'Validation error or invalid file type' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  @ApiResponse({ status: 403, description: 'Not admin' })
  create(
    @Body() dto: CreateBlogDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.blogsService.create(dto, file);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('coverImage', singleImageOptions))
  @ApiOperation({ summary: 'Update blog post', description: 'All fields optional. New coverImage replaces old (old deleted from Cloudinary).' })
  @ApiParam({ name: 'id', description: 'Blog MongoDB ObjectId' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title:      { type: 'string' },
        content:    { type: 'string' },
        excerpt:    { type: 'string' },
        status:     { type: 'string', enum: ['draft', 'published'] },
        coverImage: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Blog updated' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBlogDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.blogsService.update(id, dto, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete blog post', description: 'Deletes record and removes coverImage from Cloudinary.' })
  @ApiParam({ name: 'id', description: 'Blog MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Deleted — returns { success: true }' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
