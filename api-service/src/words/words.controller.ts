import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
  Param,
  NotFoundException,
  Delete,
  Put,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { Word } from './entity/word.entity';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  findAll(): Promise<Word[]> {
    return this.wordsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: Word['id']): Promise<Word> {
    try {
      const wordOrUndefined = await this.wordsService.findById(id);
      if (!wordOrUndefined) {
        throw new NotFoundException();
      }
      return wordOrUndefined;
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new InternalServerErrorException(e, 'Internal Server Error');
    }
  }

  @Post('add')
  async create(@Body() createWordDto: CreateWordDto): Promise<void> {
    try {
      await this.wordsService.create(createWordDto);
    } catch (e) {
      throw new InternalServerErrorException(e, 'Internal Server Error');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: Word['id'],
    @Body() updateWordDto: UpdateWordDto,
  ): Promise<void> {
    try {
      await this.wordsService.update(id, updateWordDto);
    } catch (e) {
      throw new InternalServerErrorException(e, 'Internal Server Error');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: Word['id']): Promise<void> {
    try {
      await this.wordsService.delete(id);
    } catch (e) {
      throw new InternalServerErrorException(e, 'Internal Server Error');
    }
  }
}
