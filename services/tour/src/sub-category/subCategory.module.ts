import { Module } from '@nestjs/common';
import { SubCategoryController } from './subCategory.controller';
import { SubCategoryService } from './subCategory.service';
import { EntityManager } from '@mikro-orm/core';

@Module({
  controllers: [SubCategoryController],
  providers: [SubCategoryService, EntityManager]
})
export class SubCategoryModule {}
