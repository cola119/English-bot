import { Injectable } from '@nestjs/common';
import { Word } from './entity/word.entity';
import { Repository, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word) private readonly wordRepository: Repository<Word>,
  ) {}

  findAll(): Promise<Word[]> {
    return this.wordRepository.find();
  }

  create(word: Omit<Word, 'id'>): Promise<InsertResult> {
    return this.wordRepository.insert(word);
  }
}
