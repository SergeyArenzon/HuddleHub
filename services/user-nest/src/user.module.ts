import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
// import mikroOrmConfig from './mikro-orm.config';
// import { MikroOrmModule } from '@mikro-orm/nestjs';
// import { User } from './entities/user.entity';

@Module({
  imports: [
    // MikroOrmModule.forRoot(mikroOrmConfig),
    // MikroOrmModule.forFeature({ entities: [User] }),
  ],
  controllers: [UserController],
})
export class UserModule {}
