import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as multer from 'multer';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.setGlobalPrefix('selfcare-ms-corporate/v1');
  const config = new DocumentBuilder()
    .setTitle('Micro-service corporate')
    .setDescription('Description corporate')
    .setVersion('1.0.0')
    .addTag('corporate')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  const multerConfig = multer({ dest: './uploads/' }).single('file');
  app.use(multerConfig);
  // Configuration personnalisée de Morgan
  app.use(express.json());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(9012);
}

bootstrap().then();
