import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';;
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMqConfig, microOrmConfig } from 'config';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MikroOrmModule.forRoot(microOrmConfig),
    ClientsModule.register(rabbitMqConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
