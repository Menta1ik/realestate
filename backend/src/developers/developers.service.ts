import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Injectable()
export class DevelopersService {
  constructor(private prisma: PrismaService) {}

  async create(createDeveloperDto: CreateDeveloperDto) {
    return this.prisma.developer.create({
      data: createDeveloperDto,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DeveloperWhereUniqueInput;
    where?: Prisma.DeveloperWhereInput;
    orderBy?: Prisma.DeveloperOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.developer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        projects: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.developer.findFirst({
        where: {
            OR: [
                { id: id },
                { slug: id }
            ]
        },
        include: {
            projects: {
              include: {
                area: true,
                photos: true,
                unitTypes: true,
              }
            },
            properties: {
              include: {
                area: true,
                photos: true,
                unitTypes: true,
              }
            }
        }
    });
  }

  async update(id: string, updateDeveloperDto: UpdateDeveloperDto) {
    return this.prisma.developer.update({
      where: { id },
      data: updateDeveloperDto,
    });
  }

  async remove(id: string) {
    return this.prisma.developer.delete({
      where: { id },
    });
  }
}
