import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';


const config: MikroOrmModuleSyncOptions = {
  clientUrl: process.env.USER_DB_HOST, // Connection URL
  entities: [User],
  driver: PostgreSqlDriver, // Specify PostgreSQL driver
  migrations: {
    path: 'src/migrations', // Ensure migrations are inside src
  },
  debug: true, // Enable for development
};
export default config;
