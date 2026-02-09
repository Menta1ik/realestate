import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const initData = request.headers['authorization']; // We expect the raw initData string here

    if (!initData) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    // Check if it's a Bearer token or raw initData. 
    // Usually frontend sends: `twa-init-data <initData>` or just `<initData>`
    // Let's assume the frontend sends the raw initData string in the Authorization header.

    if (!this.validateInitData(initData)) {
      throw new UnauthorizedException('Invalid Telegram initData');
    }

    // Attach parsed user data to request
    const urlParams = new URLSearchParams(initData);
    const userStr = urlParams.get('user');
    if (userStr) {
      try {
        request.user = JSON.parse(userStr);
      } catch (e) {
        // ignore
      }
    }

    return true;
  }

  private validateInitData(initData: string): boolean {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');

    if (!hash) {
      return false;
    }

    urlParams.delete('hash');

    const params: string[] = [];
    urlParams.forEach((value, key) => {
      params.push(`${key}=${value}`);
    });

    params.sort();
    const dataCheckString = params.join('\n');

    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined');
    }

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return calculatedHash === hash;
  }
}
