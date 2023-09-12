import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as multer from 'multer';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  app.use(express.json());
  await app.listen(9012);
}

bootstrap().then();
