import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  console.log('Starting application...');
  console.log('Current working directory:', process.cwd());
  
  // Fix SSL certificate path for Supabase
  const sslPath = path.join(process.cwd(), 'backend', 'ssl', 'supabase-ca.crt');
  if (fs.existsSync(sslPath)) {
    console.log('SSL certificate found at:', sslPath);
    if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslrootcert=./backend/ssl/supabase-ca.crt')) {
      console.log('Replacing relative SSL path with absolute path in DATABASE_URL');
      process.env.DATABASE_URL = process.env.DATABASE_URL.replace(
        'sslrootcert=./backend/ssl/supabase-ca.crt', 
        `sslrootcert=${sslPath}`
      );
    }
    if (process.env.DIRECT_URL && process.env.DIRECT_URL.includes('sslrootcert=./backend/ssl/supabase-ca.crt')) {
       console.log('Replacing relative SSL path with absolute path in DIRECT_URL');
       process.env.DIRECT_URL = process.env.DIRECT_URL.replace(
         'sslrootcert=./backend/ssl/supabase-ca.crt', 
         `sslrootcert=${sslPath}`
       );
    }
  } else {
    console.warn('WARNING: SSL certificate NOT found at:', sslPath);
    // Try to list files in backend directory to debug
    const backendPath = path.join(process.cwd(), 'backend');
    if (fs.existsSync(backendPath)) {
      console.log('Contents of backend directory:', fs.readdirSync(backendPath));
    } else {
      console.log('Backend directory not found at:', backendPath);
    }
  }

  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  app.enableCors();
  
  const port = process.env.PORT ?? 3001;
  console.log(`Listening on port ${port}`);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
