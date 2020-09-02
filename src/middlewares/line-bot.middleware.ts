import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as line from '@line/bot-sdk';

@Injectable()
export class LineBotMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => any): void {
    const config = {
      channelAccessToken: process.env.LINE_BOT_ACCESS_TOKEN,
      channelSecret: process.env.LINE_BOT_SECRET,
    };
    line.middleware(config)(req, res, next);
  }
}
