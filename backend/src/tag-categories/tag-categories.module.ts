import { Module } from '@nestjs/common';
import { TagCategoriesService } from './tag-categories.service';
import { TagCategoriesController } from './tag-categories.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [TagCategoriesService, PrismaService],
  controllers: [TagCategoriesController]
})
export class TagCategoriesModule {}
