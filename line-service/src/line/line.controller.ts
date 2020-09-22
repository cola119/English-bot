import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka-options.interface';
import { LineService } from './line.service';
import * as line from '@line/bot-sdk';

const topic = 'get.message.event';

@Controller('line')
export class LineController {
  constructor(private readonly lineService: LineService) {}

  @EventPattern(topic)
  getMessage(@Payload() message: KafkaMessage): void {
    console.log(message.value);
    const lineEvent = (message.value as any) as line.MessageEvent;
    this.lineService.translation(lineEvent);
  }
}
