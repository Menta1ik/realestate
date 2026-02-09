import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Prisma } from '@prisma/client';
import { TelegramAuthGuard } from '../guards/telegram-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('bedrooms') bedrooms?: string,
    @Query('sort') sort?: string, // price_asc, price_desc
  ) {
    const where: Prisma.ProjectWhereInput = {
      AND: [],
    };

    const and = where.AND as Prisma.ProjectWhereInput[];

    if (search) {
      and.push({
        OR: [
          { nameEn: { contains: search } }, // SQLite is case-sensitive by default usually, but Prisma handles insensitive?
          { nameRu: { contains: search } },
          { developer: { contains: search } },
          { ref: { contains: search } },
        ],
      });
    }

    if (status && status !== 'all') {
      and.push({ status: { equals: status } }); // Make sure case matches or handle mapping
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
       // If user filters for "2", we check if string contains "2".
       // Note: this is a simple naive search. Better to store as array or normalize.
       if (bedrooms === 'studio') {
         and.push({ bedrooms: { contains: 'Studio' } });
       } else if (bedrooms === '4+') {
          // Complex logic, maybe just search for 4, 5, 6...
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

    const orderBy: Prisma.ProjectOrderByWithRelationInput = {};
    if (sort === 'price_asc') {
      orderBy.priceFromAED = 'asc';
    } else if (sort === 'price_desc') {
      orderBy.priceFromAED = 'desc';
    } else {
      orderBy.createdAt = 'desc'; // Default
    }

    return this.projectsService.findAll({
      where,
      orderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
