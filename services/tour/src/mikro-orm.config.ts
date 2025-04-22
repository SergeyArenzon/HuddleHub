import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Tour } from 'src/entities/tour.entity';

const microOrmConfig: MikroOrmModuleSyncOptions = {
  clientUrl: process.env.DATABASE_URL, // Connection URL
  entities: [Tour],
  driver: PostgreSqlDriver, // Specify PostgreSQL driver
  migrations: {
    path: './migrations', // Ensure migrations are inside src
  },
  debug: true, // Enable for development
};
export default microOrmConfig;
