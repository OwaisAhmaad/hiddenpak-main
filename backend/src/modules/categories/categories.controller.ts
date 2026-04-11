import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /** Public — list all categories, optional ?type=village|city|other */
  @Get('categories')
  @ApiTags('Categories — Public')
  @ApiOperation({ summary: 'List all categories', description: 'Returns all categories. Filter by type using the optional query param.' })
  @ApiQuery({ name: 'type', required: false, enum: ['village', 'city', 'other'], description: 'Filter by category type' })
  @ApiResponse({
    status: 200,
    description: 'List of categories',
    schema: {
      example: {
        success: true,
        message: 'OK',
        data: [
          { _id: '64f...', name: 'Mountains', slug: 'mountains', type: 'other', description: 'Scenic peaks', createdAt: '2024-01-01T00:00:00.000Z' },
        ],
      },
    },
  })
  getAll(@Query('type') type?: string) {
    return this.categoriesService.getAll(type);
  }

  /** Admin-only CRUD */
  @Post('admin/categories')
  @ApiTags('Categories — Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a category (admin)' })
  @ApiResponse({
    status: 201,
    description: 'Category created',
    schema: {
      example: {
        success: true,
        message: 'Category created successfully',
        data: { _id: '64f...', name: 'Mountains', slug: 'mountains', type: 'other', description: '' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Patch('admin/categories/:id')
  @ApiTags('Categories — Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update a category (admin)' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId of the category' })
  @ApiResponse({
    status: 200,
    description: 'Category updated',
    schema: {
      example: {
        success: true,
        message: 'Category updated successfully',
        data: { _id: '64f...', name: 'Valleys', slug: 'valleys', type: 'village', description: 'Beautiful valleys' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete('admin/categories/:id')
  @ApiTags('Categories — Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a category (admin)' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId of the category' })
  @ApiResponse({
    status: 200,
    description: 'Category deleted',
    schema: {
      example: {
        success: true,
        message: 'Category deleted successfully',
        data: { success: true },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
