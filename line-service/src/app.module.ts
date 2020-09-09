import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineController } from './line/line.controller';

@Module({
  imports: [],
  controllers: [AppController, LineController],
  providers: [AppService],
})
export class AppModule {}
