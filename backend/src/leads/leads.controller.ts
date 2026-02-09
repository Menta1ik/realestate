import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { Prisma } from '@prisma/client';
import { TelegramAuthGuard } from '../guards/telegram-auth.guard';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() data: Prisma.LeadCreateInput) {
    return this.leadsService.create(data);
  }

  // Only admin/authorized users should see leads. 
  // For now, I'll protect it with the same guard, but ideally needs role checks.
  @UseGuards(TelegramAuthGuard)
  @Get()
  findAll() {
    return this.leadsService.findAll();
  }
}
