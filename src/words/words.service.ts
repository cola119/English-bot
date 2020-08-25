import { Injectable } from '@nestjs/common';
import { Word } from './entity/word.entity';

@Injectable()
export class WordsService {
  findAll(): Word[] {
    return [{ str: 'Hello' }];
  }
}
