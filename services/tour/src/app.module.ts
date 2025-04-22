import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import microOrmConfig from './mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forRoot(microOrmConfig), AppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
