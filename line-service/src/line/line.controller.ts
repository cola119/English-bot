import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka-options.interface';

@Controller('line')
export class LineController {
  @MessagePattern('get.new.message')
  getMessage(@Payload() message: KafkaMessage): void {
    console.log('got');
    console.log(message);
  }
}
