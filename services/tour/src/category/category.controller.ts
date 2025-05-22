import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'Return all categories', type: [CategoryDto] })
    async getCategories(): Promise<CategoryDto[]> {
        return this.categoryService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a category by id' })
    @ApiResponse({ status: 200, description: 'Return the category', type: CategoryDto })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async getCategoryById(@Param('id') id: string): Promise<CategoryDto> {
        try {
            return await this.categoryService.getById(id);
        } catch (error) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'The category has been successfully created', type: CategoryDto })
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
        return this.categoryService.create(createCategoryDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a category' })
    @ApiResponse({ status: 200, description: 'The category has been successfully updated', type: CategoryDto })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async updateCategory(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto
    ): Promise<CategoryDto> {
        try {
            return await this.categoryService.update(id, updateCategoryDto);
        } catch (error) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category' })
    @ApiResponse({ status: 204, description: 'The category has been successfully deleted' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async deleteCategory(@Param('id') id: string): Promise<void> {
        try {
            await this.categoryService.delete(id);
        } catch (error) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
    }
}
