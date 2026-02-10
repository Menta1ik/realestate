import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {}

  async create(createFeatureDto: CreateFeatureDto) {
    return this.prisma.feature.create({
      data: createFeatureDto,
    });
  }

  async findAll() {
    return this.prisma.feature.findMany({
      orderBy: { nameEn: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.feature.findUnique({ where: { id } });
  }

  async update(id: string, updateFeatureDto: UpdateFeatureDto) {
    return this.prisma.feature.update({
      where: { id },
      data: updateFeatureDto,
    });
  }

  async remove(id: string) {
    return this.prisma.feature.delete({
      where: { id },
    });
  }
}
