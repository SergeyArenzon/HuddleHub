import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { SubCategory } from '../entities/subCategory.entity';
import { SubCategoryDto, CreateSubCategoryDto, UpdateSubCategoryDto } from '../dto/subCategory.dto';

@Injectable()
export class SubCategoryService {
    constructor(private readonly em: EntityManager) {}

    async getAll(): Promise<SubCategoryDto[]> {
        const subCategories = await this.em.find(SubCategory, {});
        return subCategories;
    }

    async getById(id: string): Promise<SubCategoryDto> {
        const subCategory = await this.em.findOne(SubCategory, { id });
        if (!subCategory) {
            throw new Error('SubCategory not found');
        }
        return subCategory;
    }

    async create(createSubCategoryDto: CreateSubCategoryDto): Promise<SubCategoryDto> {
        const subCategory = new SubCategory(createSubCategoryDto);
        await this.em.persistAndFlush(subCategory);
        return subCategory;
    }

    async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto): Promise<SubCategoryDto> {
        const subCategory = await this.em.findOne(SubCategory, { id });
        if (!subCategory) {
            throw new Error('SubCategory not found');
        }
        
        this.em.assign(subCategory, updateSubCategoryDto);
        await this.em.flush();
        return subCategory;
    }

    async delete(id: string): Promise<void> {
        const subCategory = await this.em.findOne(SubCategory, { id });
        if (!subCategory) {
            throw new Error('SubCategory not found');
        }
        await this.em.removeAndFlush(subCategory);
    }
}
