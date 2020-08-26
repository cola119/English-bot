import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { Word } from './entity/word.entity';
import { CreateWordDto } from './dto/create-word.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  findAll(): Promise<Word[]> {
    return this.wordsService.findAll();
  }

  @Post('add')
  async create(@Body() createWordDto: CreateWordDto): Promise<void> {
    try {
      await this.wordsService.create(createWordDto);
    } catch (e) {
      throw new InternalServerErrorException(e, 'Internal Server Error');
    }
  }
}
