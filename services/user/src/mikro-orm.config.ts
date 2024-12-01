import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: MikroOrmModuleSyncOptions = {
  clientUrl: process.env.USER_DB_HOST, // Connection URL
  entities: ['./dist/entities'], // Path to compiled entities
  entitiesTs: ['./src/entities'], // Path to TypeScript entities
  driver: PostgreSqlDriver, // Specify PostgreSQL driver
  debug: true, // Enable for development
};
export default config;
