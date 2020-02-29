import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '../public/'), {
    prefix: '/public/',
  });
  app.useStaticAssets(join(__dirname, '../../recruitment-web/dist/'), {
    prefix: '/',
  });
  await app.listen(3800);
}
bootstrap();
