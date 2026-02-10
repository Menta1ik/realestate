import { Controller, Get, Post, Body, Put, Param, Delete, Res } from '@nestjs/common';
import { TagCategoriesService } from './tag-categories.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('tag-categories')
export class TagCategoriesController {
  constructor(private readonly tagCategoriesService: TagCategoriesService) {}

  @Post()
  create(@Body() data: Prisma.TagCategoryCreateInput) {
    return this.tagCategoriesService.create(data);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const items = await this.tagCategoriesService.findAll();
    res.set('Content-Range', `tag-categories 0-${items.length}/${items.length}`);
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    return res.json(items);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagCategoriesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.TagCategoryUpdateInput) {
    return this.tagCategoriesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagCategoriesService.remove(id);
  }
}
