import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineController } from './line/line.controller';
import { LineService } from './line/line.service';
import { ConfigModule } from '@nestjs/config';
import { Client } from '@line/bot-sdk';
import { Translate } from '@google-cloud/translate/build/src/v2';
import { DI_TOKENS } from './constants';
import { Dictionary } from 'oxford-dictionary-nodejs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, LineController],
  providers: [
    AppService,
    LineService,
    {
      provide: DI_TOKENS.LINE_CLIENT,
      useValue: new Client({
        channelAccessToken: process.env.LINE_BOT_ACCESS_TOKEN,
        channelSecret: process.env.LINE_BOT_SECRET,
      }),
    },
    {
      provide: DI_TOKENS.GC_TRANSLATE,
      useValue: new Translate({ key: process.env.GCP_TRANSLATE_KEY }),
    },
    {
      provide: DI_TOKENS.OX_DICTIONARY,
      useValue: new Dictionary({
        appId: process.env.OX_APP_ID,
        appKey: process.env.OX_APP_KEY,
      }),
    },
  ],
})
export class AppModule {}
