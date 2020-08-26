import { Injectable } from '@nestjs/common';
import { Word } from './entity/word.entity';
import { Repository, InsertResult, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word) private readonly wordRepository: Repository<Word>,
  ) {}

  findAll(): Promise<Word[]> {
    return this.wordRepository.find();
  }

  findById(id: Word['id']): Promise<Word | undefined> {
    return this.wordRepository.findOne(id);
  }

  create(word: Partial<Word>): Promise<InsertResult> {
    return this.wordRepository.insert(word);
  }

  update(id: Word['id'], word: Partial<Word>): Promise<UpdateResult> {
    return this.wordRepository.update(id, word);
  }

  delete(id: Word['id']): Promise<DeleteResult> {
    return this.wordRepository.delete(id);
  }
}
