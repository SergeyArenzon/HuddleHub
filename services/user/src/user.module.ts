import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import mikroOrmConfig from './mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserService } from './user.service';
import { LoggerMiddleware } from './logger.middleware';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GuideModule } from './guide/guide.module';
import { TravellerService } from './traveller/traveller.service';
import { TravellerModule } from './traveller/traveller.module';
import { Traveller, User } from './entities';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature([User, Traveller]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_HOST],
          queue: 'user_queue',
        },
      },
    ]),
    GuideModule,
    TravellerModule,
  ],
  controllers: [UserController],
  providers: [UserService, TravellerService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
