import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Starting application...');
  console.log('Current working directory:', process.cwd());
  
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  app.enableCors();
  
  const port = process.env.PORT ?? 3001;
  console.log(`Listening on port ${port}`);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
