import { Controller, Get, Param, Query } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { Prisma } from '@prisma/client';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get()
  findAll(@Query('search') search?: string) {
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
    
    return this.developersService.findAll({ where, orderBy: { name: 'asc' } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.developersService.findOne(id);
  }
}
