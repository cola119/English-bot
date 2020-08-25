import { Controller, Get } from '@nestjs/common';
import { WordsService } from './words.service';
import { Word } from './entity/word.entity';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  findAll(): Word[] {
    return this.wordsService.findAll();
  }
}
