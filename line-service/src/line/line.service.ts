import { Injectable } from '@nestjs/common';
import * as line from '@line/bot-sdk';

@Injectable()
export class LineService {
  client: line.Client;

  constructor() {
    const config = {
      channelAccessToken: process.env.LINE_BOT_ACCESS_TOKEN,
      channelSecret: process.env.LINE_BOT_SECRET,
    };
    this.client = new line.Client(config);
  }

  echoMessage(event: line.MessageEvent): Promise<line.MessageAPIResponseBase> {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.reject('Not message event');
    }
    const echo = { type: 'text', text: event.message.text } as const;
    return this.client.replyMessage(event.replyToken, echo);
  }
}
