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
import { PlacesService } from './places.service';
import { CreatePlaceDto, UpdatePlaceDto } from './dto/place.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('region') region?: string,
    @Query('category') category?: string,
  ) {
    return this.placesService.getAll({ page, limit, search, region, category });
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.placesService.getBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreatePlaceDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.placesService.create(dto, file);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image'))
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
  @UseInterceptors(FileInterceptor('image'))
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
  remove(@Param('id') id: string) {
    return this.placesService.remove(id);
  }
}
