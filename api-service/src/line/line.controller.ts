import { Controller, Post, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('line')
export class LineController {
  @Get()
  hello(): string {
    return 'hello line';
  }

  @Post('webhook')
  webhook(@Req() req: Request, @Res() res: Response): void {
    const events = req.body.events;
    console.log(events);
    res.status(200).end();
  }
}
