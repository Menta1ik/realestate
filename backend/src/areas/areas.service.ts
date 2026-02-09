import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AreasService {
  constructor(private prisma: PrismaService) {}

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
}
