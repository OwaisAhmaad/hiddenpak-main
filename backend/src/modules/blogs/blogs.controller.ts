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
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { singleImageOptions } from '../../common/multer.config';

// ── Public routes ──────────────────────────────────────────────
@Controller('blogs')
export class BlogsPublicController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('status') status?: string,
  ) {
    return this.blogsService.getAll({ page, limit, search, category, status });
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.blogsService.getBySlug(slug);
  }
}

// ── Admin routes ────────────────────────────────────────────────
@Controller('admin/blogs')
export class BlogsAdminController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('coverImage', singleImageOptions))
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
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
