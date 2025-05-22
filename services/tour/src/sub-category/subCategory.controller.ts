import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubCategoryService } from './subCategory.service';
import { SubCategoryDto, CreateSubCategoryDto, UpdateSubCategoryDto } from '../dto/subCategory.dto';

@ApiTags('sub-categories')
@Controller('sub-categories')
export class SubCategoryController {
    constructor(private readonly subCategoryService: SubCategoryService) {}

    @Get()
    @ApiOperation({ summary: 'Get all sub-categories' })
    @ApiResponse({ status: 200, description: 'Return all sub-categories', type: [SubCategoryDto] })
    async getSubCategories(): Promise<SubCategoryDto[]> {
        return this.subCategoryService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a sub-category by id' })
    @ApiResponse({ status: 200, description: 'Return the sub-category', type: SubCategoryDto })
    @ApiResponse({ status: 404, description: 'SubCategory not found' })
    async getSubCategoryById(@Param('id') id: string): Promise<SubCategoryDto> {
        try {
            return await this.subCategoryService.getById(id);
        } catch (error) {
            throw new HttpException('SubCategory not found', HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new sub-category' })
    @ApiResponse({ status: 201, description: 'The sub-category has been successfully created', type: SubCategoryDto })
    async createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto): Promise<SubCategoryDto> {
        return this.subCategoryService.create(createSubCategoryDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a sub-category' })
    @ApiResponse({ status: 200, description: 'The sub-category has been successfully updated', type: SubCategoryDto })
    @ApiResponse({ status: 404, description: 'SubCategory not found' })
    async updateSubCategory(
        @Param('id') id: string,
        @Body() updateSubCategoryDto: UpdateSubCategoryDto
    ): Promise<SubCategoryDto> {
        try {
            return await this.subCategoryService.update(id, updateSubCategoryDto);
        } catch (error) {
            throw new HttpException('SubCategory not found', HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a sub-category' })
    @ApiResponse({ status: 204, description: 'The sub-category has been successfully deleted' })
    @ApiResponse({ status: 404, description: 'SubCategory not found' })
    async deleteSubCategory(@Param('id') id: string): Promise<void> {
        try {
            await this.subCategoryService.delete(id);
        } catch (error) {
            throw new HttpException('SubCategory not found', HttpStatus.NOT_FOUND);
        }
    }
}
