import { Inject, Injectable } from '@nestjs/common';
import { Client, MessageEvent, MessageAPIResponseBase } from '@line/bot-sdk';
import { DI_TOKENS } from 'src/constants';
import { Dictionary } from 'oxford-dictionary-nodejs';

type BotDictionary = {
  definitions: string[];
  synonyms: string[];
  examples: string[];
};
const initialDictionary: BotDictionary = {
  definitions: [],
  synonyms: [],
  examples: [],
};
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

      const { definitions, synonyms, examples } = result.lexicalEntries.reduce(
        (acc, lexicalEntry) => {
          const dict = lexicalEntry.entries?.reduce<BotDictionary>(
            (acc, entry) => {
              const dict = entry.senses?.reduce<BotDictionary>((acc, sense) => {
                const definition = sense.definitions ?? [];
                const synonym = sense.synonyms?.map(s => s.text) ?? [];
                const example = sense.examples?.map(e => e.text) ?? [];
                return {
                  definitions: [...acc.definitions, ...definition],
                  synonyms: [...acc.synonyms, ...synonym],
                  examples: [...acc.examples, ...example],
                };
              }, initialDictionary);
              return mergeBotDictionary(acc, dict);
            },
            initialDictionary,
          );
          return mergeBotDictionary(acc, dict);
        },
        initialDictionary,
      );

      const messages = [
        bulletFormat(definitions),
        withComma(synonyms),
        bulletFormat(examples),
      ];
      return this.sendMessage(event.replyToken, messages);

      // const pronounciation =
      //   result.lexicalEntries[0].entries[0].pronunciations[0];
      // const phoneticSpelling = pronounciation.phoneticSpelling;
      // const audioFile = pronounciation.audioFile;
      // const word = `${phoneticSpelling}\n${audioFile}`;
      // return this.sendMessage(event.replyToken, word);
    } catch (e) {
      return this.sendMessage(
        event.replyToken,
        e.message || 'something error happend',
      );
    }
  }

  private sendMessage(
    token: string,
    text: string | string[],
  ): Promise<MessageAPIResponseBase> {
    if (typeof text === 'string') {
      return this.client.replyMessage(token, {
        type: 'text',
        text,
      });
    }
    return this.client.replyMessage(
      token,
      text.map(_text => ({
        type: 'text',
        text: _text,
      })),
    );
  }
}

const reduceString = (separator: string) => (arr?: string[]): string =>
  arr?.reduce((p, c) => (p === '' ? c : `${p}${separator}${c}`), '') ?? '';
const withLine = reduceString('\n');
const withComma = reduceString(', ');
const bulletFormat = (args?: string[]): string =>
  withLine(args?.map(arg => `- ${arg}`));

const mergeBotDictionary = (
  a: BotDictionary = initialDictionary,
  b: BotDictionary = initialDictionary,
): BotDictionary => {
  return {
    definitions: [...a.definitions, ...b.definitions],
    synonyms: [...a.synonyms, ...b.synonyms],
    examples: [...a.examples, ...b.examples],
  };
};
