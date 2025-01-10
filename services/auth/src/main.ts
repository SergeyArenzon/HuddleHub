import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const logger = new Logger('Bootstrap');
  app.use(cookieParser());
  app.enableCors({ credentials: true });
  app.useLogger(logger);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
