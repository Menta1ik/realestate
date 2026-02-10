import { Controller, Get, Post, Body, Put, Param, Delete, Query, Res } from '@nestjs/common';
import { LayoutTypesService } from './layout-types.service';
import { CreateLayoutTypeDto } from './dto/create-layout-type.dto';
import { UpdateLayoutTypeDto } from './dto/update-layout-type.dto';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Controller('layout-types')
export class LayoutTypesController {
  constructor(private readonly layoutTypesService: LayoutTypesService) {}

  @Post()
  create(@Body() createLayoutTypeDto: CreateLayoutTypeDto) {
    return this.layoutTypesService.create(createLayoutTypeDto);
  }

  @Get()
  async findAll(
    @Query('_start') start: string,
    @Query('_end') end: string,
    @Query('_sort') sort: string,
    @Query('_order') order: string,
    @Query('q') q: string,
    @Res() res: Response
  ) {
    const where: Prisma.LayoutTypeWhereInput = {
      AND: [],
    };

    if (q) {
      (where.AND as Prisma.LayoutTypeWhereInput[]).push({
        OR: [
          { nameEn: { contains: q, mode: 'insensitive' } },
          { nameRu: { contains: q, mode: 'insensitive' } },
          { code: { contains: q, mode: 'insensitive' } },
        ],
      });
    }

    const orderBy: Prisma.LayoutTypeOrderByWithRelationInput = {};
    if (sort) {
        orderBy[sort] = order?.toLowerCase() === 'asc' ? 'asc' : 'desc';
    } else {
        orderBy.sortOrder = 'asc';
    }

    const take = end && start ? Number(end) - Number(start) : undefined;
    const skip = start ? Number(start) : undefined;

    const items = await this.layoutTypesService.findAll({
      where,
      orderBy,
      skip,
      take
    });

    const total = await this.layoutTypesService.findAll({ where }); // Not efficient for total count but okay for now

    res.set('x-total-count', total.length.toString());
    res.set('Access-Control-Expose-Headers', 'x-total-count');
    return res.json(items);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.layoutTypesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLayoutTypeDto: UpdateLayoutTypeDto) {
    return this.layoutTypesService.update(id, updateLayoutTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.layoutTypesService.remove(id);
  }
}
