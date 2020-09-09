import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, NestApplicationOptions } from '@nestjs/common';
import * as helmet from 'helmet';

async function bootstrap() {
  const options: NestApplicationOptions = {
    bodyParser: false,
    cors: true,
  };
  const app = await NestFactory.create(AppModule, options);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
