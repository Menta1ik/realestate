import { Controller, Get, Post, Body, Put, Param, Delete, Query, Res } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developersService.create(createDeveloperDto);
  }

  @Get()
  async findAll(@Query('search') search: string, @Res() res: Response) {
    const where: Prisma.DeveloperWhereInput = {};
    
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { nameEn: { contains: search, mode: 'insensitive' } },
            { nameRu: { contains: search, mode: 'insensitive' } },
            { descriptionEn: { contains: search, mode: 'insensitive' } },
            { descriptionRu: { contains: search, mode: 'insensitive' } }
        ];
    }
    
    const developers = await this.developersService.findAll({ where, orderBy: { name: 'asc' } });
    res.set('Content-Range', `developers 0-${developers.length}/${developers.length}`);
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    return res.json(developers);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.developersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeveloperDto: UpdateDeveloperDto) {
    return this.developersService.update(id, updateDeveloperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.developersService.remove(id);
  }
}
