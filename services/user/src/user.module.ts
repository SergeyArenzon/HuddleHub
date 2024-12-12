import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import mikroOrmConfig from './mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { LoggerMiddleware } from './logger.middlewear';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature({ entities: [User] }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
