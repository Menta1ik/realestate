import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { PropertiesModule } from './properties/properties.module';
import { LeadsModule } from './leads/leads.module';
import { DevelopersModule } from './developers/developers.module';
import { AreasModule } from './areas/areas.module';
import { FeaturesModule } from './features/features.module';
import { TagCategoriesModule } from './tag-categories/tag-categories.module';
import { LayoutTypesModule } from './layout-types/layout-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'dist'),
      exclude: ['/api/(.*)', '/api'],
      serveRoot: '/',
    }),
    PrismaModule, 
    ProjectsModule, 
    PropertiesModule, 
    LeadsModule, 
    DevelopersModule,
    AreasModule,
    FeaturesModule,
    TagCategoriesModule,
    LayoutTypesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
