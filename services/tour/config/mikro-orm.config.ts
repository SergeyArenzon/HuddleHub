import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Tour } from './entities';

const microOrmConfig: MikroOrmModuleSyncOptions = {
  clientUrl: process.env.TOUR_DB_HOST, // Connection URL
  entities: [Tour],
  driver: PostgreSqlDriver, // Specify PostgreSQL driver
  migrations: {
    path: 'src/migrations', // Ensure migrations are inside src
  },
  debug: true, // Enable for development
};
export default microOrmConfig;
