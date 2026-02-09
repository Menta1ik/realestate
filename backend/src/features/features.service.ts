import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.feature.findMany();
  }

  // Other methods left as placeholders or removed if unused
  findOne(id: string) {
    return this.prisma.feature.findUnique({ where: { id } });
  }
}
