import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { LineController } from './line.controller';
import { LineBotMiddleware } from 'src/middlewares/line-bot.middleware';

@Module({
  controllers: [LineController],
})
export class LineModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LineBotMiddleware)
      .forRoutes({ path: '/line/webhook', method: RequestMethod.POST });
  }
}
