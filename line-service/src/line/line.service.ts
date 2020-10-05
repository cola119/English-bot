import { Inject, Injectable } from '@nestjs/common';
import { Client, MessageEvent, MessageAPIResponseBase } from '@line/bot-sdk';
import { DI_TOKENS } from 'src/constants';
import { Dictionary } from 'oxford-dictionary-nodejs';

// TODO
// async await blocking
@Injectable()
export class LineService {
  constructor(
    @Inject(DI_TOKENS.LINE_CLIENT) private client: Client,
    @Inject(DI_TOKENS.OX_DICTIONARY) private dictionary: Dictionary,
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

    try {
      const entries = await this.dictionary.entries(text);
      const result = entries.results[0];
      console.log(result);
      const pronounciation =
        result.lexicalEntries[0].entries[0].pronunciations[0];
      const phoneticSpelling = pronounciation.phoneticSpelling;
      const audioFile = pronounciation.audioFile;
      const word = `${phoneticSpelling}\n${audioFile}`;
      return this.sendMessage(event.replyToken, word);
    } catch (e) {
      return this.sendMessage(
        event.replyToken,
        e.message || 'something error happend',
      );
    }
  }

  private sendMessage(
    token: string,
    text: string,
  ): Promise<MessageAPIResponseBase> {
    return this.client.replyMessage(token, {
      type: 'text',
      text,
    });
  }
}
