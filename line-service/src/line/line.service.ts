import { Injectable } from '@nestjs/common';
import * as line from '@line/bot-sdk';
import { Translate } from '@google-cloud/translate/build/src/v2';

// TODO
// inject
// async await blocking

const TranslationMap = {
  en: 'ja',
  ja: 'en',
} as const;
@Injectable()
export class LineService {
  client: line.Client;
  transrator: Translate;

  constructor() {
    const config = {
      channelAccessToken: process.env.LINE_BOT_ACCESS_TOKEN,
      channelSecret: process.env.LINE_BOT_SECRET,
    };
    this.client = new line.Client(config);
    this.transrator = new Translate({
      key: process.env.GCP_TRANSLATE_KEY,
    });
  }

  echoMessage(event: line.MessageEvent): Promise<line.MessageAPIResponseBase> {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.reject('Not message event');
    }
    const echo = { type: 'text', text: event.message.text } as const;
    return this.client.replyMessage(event.replyToken, echo);
  }

  async translation(
    event: line.MessageEvent,
  ): Promise<line.MessageAPIResponseBase> {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.reject('Not message event');
    }
    const text = event.message.text;
    const [lang] = await this.transrator.detect(text);
    console.log(lang);
    const translations = await this.transrator.translate(text, {
      to: TranslationMap[lang.language] ?? 'en',
    });
    console.log(translations);
    const word = translations[0];
    const echo = { type: 'text', text: word } as const;
    return this.client.replyMessage(event.replyToken, echo);
  }
}
