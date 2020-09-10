import { Controller, Post, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

const topic = 'get.message.event';

@Controller('line')
export class LineController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['192.168.3.7:32770', '192.168.3.7:32768'],
      },
      consumer: { groupId: 'line-consumer' },
    },
  })
  private client: ClientKafka;

  @Get()
  hello(): string {
    return 'hello line';
  }

  @Post('webhook')
  webhook(@Req() req: Request, @Res() res: Response): void {
    console.log('webhook');
    const events = req.body.events as any[];
    events.forEach(event => {
      this.client.emit(topic, event);
    });
    res.status(200).end();
  }

  private async onModuleInit() {
    console.log('onModuleInit');
    await this.client.connect();
  }
}
