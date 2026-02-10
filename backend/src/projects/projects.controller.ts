import { Controller, Get, Post, Body, Put, Param, Delete, Query, Res } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('status') status: string,
    @Query('type') type: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
    @Query('bedrooms') bedrooms: string,
    @Query('sort') sort: string,
    @Res() res: Response
  ) {
    const where: Prisma.ProjectWhereInput = {
      AND: [],
    };

    const and = where.AND as Prisma.ProjectWhereInput[];

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

    const orderBy: Prisma.ProjectOrderByWithRelationInput = {};
    if (sort === 'price_asc') {
      orderBy.priceFromAED = 'asc';
    } else if (sort === 'price_desc') {
      orderBy.priceFromAED = 'desc';
    } else {
      orderBy.createdAt = 'desc';
    }

    const projects = await this.projectsService.findAll({
      where,
      orderBy,
    });
    
    res.set('Content-Range', `projects 0-${projects.length}/${projects.length}`);
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    return res.json(projects);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
