import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreasService {
  constructor(private prisma: PrismaService) {}

  create(createAreaDto: CreateAreaDto) {
    return this.prisma.area.create({
      data: createAreaDto,
    });
  }

  findAll() {
    return this.prisma.area.findMany({
      orderBy: { nameEn: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.area.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAreaDto: UpdateAreaDto) {
    return this.prisma.area.update({
      where: { id },
      data: updateAreaDto,
    });
  }

  remove(id: string) {
    return this.prisma.area.delete({
      where: { id },
    });
  }
}
