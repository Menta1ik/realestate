import { Controller, Get, Post, Body, Put, Param, Delete, Query, Res } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('status') status: string,
    @Query('type') type: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
    @Query('bedrooms') bedrooms: string,
    @Query('sort') sort: string, // price_asc, price_desc
    @Res() res: Response
  ) {
    const where: Prisma.PropertyWhereInput = {
      AND: [],
    };

    const and = where.AND as Prisma.PropertyWhereInput[];

    if (search) {
      and.push({
        OR: [
          { nameEn: { contains: search } },
          { nameRu: { contains: search } },
          { developer: { contains: search } },
          { ref: { contains: search } },
        ],
      });
    }

    if (status && status !== 'all') {
      and.push({ status: { equals: status } });
    }

    if (type) {
      and.push({ type: { equals: type } });
    }

    if (minPrice) {
      and.push({ priceFromAED: { gte: Number(minPrice) } });
    }

    if (maxPrice) {
      and.push({ priceFromAED: { lte: Number(maxPrice) } });
    }

    if (bedrooms) {
       // "bedrooms" in DB is string "1, 2, 3".
       if (bedrooms === 'studio') {
         and.push({ bedrooms: { contains: 'Studio' } });
       } else if (bedrooms === '4+') {
          and.push({
             OR: [
               { bedrooms: { contains: '4' } },
               { bedrooms: { contains: '5' } },
               { bedrooms: { contains: '6' } },
               { bedrooms: { contains: '7' } },
             ]
          });
       } else {
         and.push({ bedrooms: { contains: bedrooms } });
       }
    }

    const orderBy: Prisma.PropertyOrderByWithRelationInput = {};
    if (sort === 'price_asc') {
      orderBy.priceFromAED = 'asc';
    } else if (sort === 'price_desc') {
      orderBy.priceFromAED = 'desc';
    } else {
      orderBy.createdAt = 'desc'; // Default
    }

    const properties = await this.propertiesService.findAll({
      where,
      orderBy,
    });

    res.set('Content-Range', `properties 0-${properties.length}/${properties.length}`);
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    return res.json(properties);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(id);
  }
}
