import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka-options.interface';

const topic = 'get.message.event';

@Controller('line')
export class LineController {
  @EventPattern(topic)
  getMessage(@Payload() message: KafkaMessage): void {
    console.log(message.value);
  }
}
