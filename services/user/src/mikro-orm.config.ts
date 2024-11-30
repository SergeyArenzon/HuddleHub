import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: MikroOrmModuleSyncOptions = {
  entities: ['./dist/entities'], // Path to compiled entities
  entitiesTs: ['./src/entities'], // Path to TypeScript entities
  dbName: 'mydb',
  driver: PostgreSqlDriver, // Specify PostgreSQL driver
  user: 'myuser',
  password: 'mypassword',
  host: 'localhost',
  port: 5432,
  debug: true, // Enable for development
};

export default config;
