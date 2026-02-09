import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegramAuthGuard } from './guards/telegram-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(TelegramAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }
}
