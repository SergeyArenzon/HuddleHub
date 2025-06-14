import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User, Traveller } from './entities';
import { Languages } from './languages/languages.entity';
import { Guide } from './guide/guide.entity';
import { SeedManager } from '@mikro-orm/seeder';

const microOrmConfig: MikroOrmModuleSyncOptions = {
  clientUrl: process.env.USER_DB_HOST, // Connection URL
  entities: [User, Traveller, Languages, Guide],
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
