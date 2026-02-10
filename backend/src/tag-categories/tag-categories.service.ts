import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TagCategoryCreateInput) {
    return this.prisma.tagCategory.create({ data });
  }

  async findAll() {
    return this.prisma.tagCategory.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    return this.prisma.tagCategory.findUnique({
      where: { id }
    });
  }

  async update(id: string, data: Prisma.TagCategoryUpdateInput) {
    return this.prisma.tagCategory.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    return this.prisma.tagCategory.delete({
      where: { id }
    });
  }
}
