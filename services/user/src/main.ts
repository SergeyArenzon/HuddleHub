import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const logger = new Logger('Bootstrap');
  app.useLogger(logger);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
