import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserService } from './user/user.service';
import { LoggerMiddleware } from './logger.middleware';
import { ClientsModule } from '@nestjs/microservices';
import { GuideModule } from './guide/guide.module';
import { TravellerService } from './traveller/traveller.service';
import { TravellerModule } from './traveller/traveller.module';
import { Guide, Traveller, User } from './entities';
import { GuideService } from './guide/guide.service';
import { JwtModule } from '@nestjs/jwt';
import { rabbitMqConfig, jwtConfig, microOrmConfig } from 'config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MikroOrmModule.forRoot(microOrmConfig),
    MikroOrmModule.forFeature([User, Traveller, Guide]),
    ClientsModule.register(rabbitMqConfig),
    GuideModule,
    TravellerModule,
    AppModule,
  ],
  controllers: [UserController, GuideModule],
  providers: [UserService, TravellerService, GuideService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
