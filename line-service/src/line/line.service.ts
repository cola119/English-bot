import { Inject, Injectable } from '@nestjs/common';
import { Translate } from '@google-cloud/translate/build/src/v2';
import { Client, MessageEvent, MessageAPIResponseBase } from '@line/bot-sdk';
import { DI_TOKENS } from 'src/constants';

// TODO
// async await blocking

const TranslationMap = {
  en: 'ja',
  ja: 'en',
} as const;
@Injectable()
export class LineService {
  constructor(
    @Inject(DI_TOKENS.LINE_CLIENT) private client: Client,
    @Inject(DI_TOKENS.GC_TRANSLATE) private translator: Translate,
  ) {}

  echoMessage(event: MessageEvent): Promise<MessageAPIResponseBase> {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.reject('Not message event');
    }
    const echo = { type: 'text', text: event.message.text } as const;
    return this.client.replyMessage(event.replyToken, echo);
  }

  async translation(event: MessageEvent): Promise<MessageAPIResponseBase> {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.reject('Not message event');
    }
    const text = event.message.text;
    const [lang] = await this.translator.detect(text);
    console.log(lang);
    const translations = await this.translator.translate(text, {
      to: TranslationMap[lang.language] ?? 'en',
    });
    console.log(translations);
    const word = translations[0];
    const echo = { type: 'text', text: word } as const;
    return this.client.replyMessage(event.replyToken, echo);
  }
}
