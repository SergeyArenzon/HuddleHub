import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Category } from '../entities/category.entity';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly em: EntityManager) {}

    async getAll(): Promise<CategoryDto[]> {
        const categories = await this.em.find(Category, {});
        return categories;
    }

    async getById(id: string): Promise<CategoryDto> {
        const category = await this.em.findOne(Category, { id });
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
        const category = new Category(createCategoryDto);
        await this.em.persistAndFlush(category);
        return category;
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
        const category = await this.em.findOne(Category, { id });
        if (!category) {
            throw new Error('Category not found');
        }
        
        this.em.assign(category, updateCategoryDto);
        await this.em.flush();
        return category;
    }

    async delete(id: string): Promise<void> {
        const category = await this.em.findOne(Category, { id });
        if (!category) {
            throw new Error('Category not found');
        }
        await this.em.removeAndFlush(category);
    }
}
