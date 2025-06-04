import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { Category } from './category/entities/category.entity';
import { SubCategory } from './sub-category/entities/sub-category';

const microOrmConfig: MikroOrmModuleSyncOptions = {
  clientUrl: process.env.DATABASE_URL, // Connection URL
  entities: [Category, SubCategory],
  driver: PostgreSqlDriver, // Specify PostgreSQL driver
  migrations: {
    path: './database/migrations', // Ensure migrations are inside src
  },
  extensions: [SeedManager],
  seeder: {
    path: './database/seeder',
    pathTs: './database/seeder',
  },
  debug: true, // Enable for development
};
export default microOrmConfig;
