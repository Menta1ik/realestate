import { Injectable } from '@nestjs/common';
import { CreateLayoutTypeDto } from './dto/create-layout-type.dto';
import { UpdateLayoutTypeDto } from './dto/update-layout-type.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LayoutTypesService {
  constructor(private prisma: PrismaService) {}

  async create(createLayoutTypeDto: CreateLayoutTypeDto) {
    return this.prisma.layoutType.create({
      data: createLayoutTypeDto,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LayoutTypeWhereUniqueInput;
    where?: Prisma.LayoutTypeWhereInput;
    orderBy?: Prisma.LayoutTypeOrderByWithRelationInput;
  } = {}) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.layoutType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: orderBy || { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.layoutType.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateLayoutTypeDto: UpdateLayoutTypeDto) {
    return this.prisma.layoutType.update({
      where: { id },
      data: updateLayoutTypeDto,
    });
  }

  async remove(id: string) {
    return this.prisma.layoutType.delete({
      where: { id },
    });
  }
}
