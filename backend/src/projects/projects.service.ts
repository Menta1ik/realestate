import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    const { unitTypes, photos, amenities, tags, documents, ...rest } = createProjectDto;
    return this.prisma.project.create({
      data: {
        ...rest,
        unitTypes: unitTypes ? { create: unitTypes } : undefined,
        photos: photos ? { create: photos } : undefined,
        amenities: amenities ? { create: amenities } : undefined,
        tags: tags ? { create: tags } : undefined,
        documents: documents ? { create: documents } : undefined,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.project.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        area: true,
        developerRel: true,
        photos: true,
        amenities: true,
        tags: true,
        unitTypes: true,
        documents: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        area: true,
        developerRel: true,
        photos: true,
        amenities: true,
        tags: true,
        unitTypes: true,
        documents: true,
      },
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const { unitTypes, photos, amenities, tags, documents, ...rest } = updateProjectDto;
    
    const data: any = { ...rest };
    
    if (unitTypes) {
      data.unitTypes = {
        deleteMany: {},
        create: unitTypes,
      };
    }
    if (photos) {
      data.photos = {
        deleteMany: {},
        create: photos,
      };
    }
    if (amenities) {
      data.amenities = {
        deleteMany: {},
        create: amenities,
      };
    }
    if (tags) {
      data.tags = {
        deleteMany: {},
        create: tags,
      };
    }
    if (documents) {
      data.documents = {
        deleteMany: {},
        create: documents,
      };
    }

    return this.prisma.project.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
