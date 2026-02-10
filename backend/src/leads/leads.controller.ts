import { Controller, Post, Body, Get, UseGuards, Res, Param } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { Prisma } from '@prisma/client';
import { TelegramAuthGuard } from '../guards/telegram-auth.guard';
import { Response } from 'express';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() data: Prisma.LeadCreateInput) {
    return this.leadsService.create(data);
  }

  // Only admin/authorized users should see leads. 
  // For now, removing guard to simplify admin panel integration as Auth is not requested yet.
  // @UseGuards(TelegramAuthGuard)
  @Get()
  async findAll(@Res() res: Response) {
    const leads = await this.leadsService.findAll();
    res.set('Content-Range', `leads 0-${leads.length}/${leads.length}`);
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    return res.json(leads);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }
}
