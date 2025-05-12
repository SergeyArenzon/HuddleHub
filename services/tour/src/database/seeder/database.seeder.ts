import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Category } from 'src/entities/category.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const categories = [
      {
        name: 'Adventure Tours',
        description: 'Exciting adventure tours for thrill-seekers',
      },
      {
        name: 'Cultural Tours',
        description: 'Immerse yourself in local culture and traditions',
      },
      {
        name: 'Beach Holidays',
        description: 'Relaxing beach getaways and water activities',
      },
      {
        name: 'City Breaks',
        description: 'Urban exploration and city experiences',
      },
      {
        name: 'Nature Tours',
        description: 'Explore natural wonders and wildlife',
      },
    ];

    // Create all categories in a single operation
    em.create(Category, categories);
  }
}
