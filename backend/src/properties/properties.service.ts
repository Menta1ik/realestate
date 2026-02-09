import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PropertyWhereUniqueInput;
    where?: Prisma.PropertyWhereInput;
    orderBy?: Prisma.PropertyOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.property.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        area: true,
        photos: true,
        amenities: true,
        tags: true,
        unitTypes: true,
        documents: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.property.findUnique({
      where: { id },
      include: {
        area: true,
        photos: true,
        amenities: true,
        tags: true,
        unitTypes: true,
        documents: true,
      },
    });
  }
}
