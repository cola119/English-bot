import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineController } from './line/line.controller';
import { LineService } from './line/line.service';

@Module({
  imports: [],
  controllers: [AppController, LineController],
  providers: [AppService, LineService],
})
export class AppModule {}
