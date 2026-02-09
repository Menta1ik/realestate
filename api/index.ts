import { NestFactory } from '@nestjs/core';
import { AppModule } from '../backend/src/app.module';
import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}
