import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DevelopersService {
  constructor(private prisma: PrismaService) {}

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
}
