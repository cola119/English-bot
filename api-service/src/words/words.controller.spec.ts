import { Test, TestingModule } from '@nestjs/testing';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { Word } from './entity/word.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const word1: Word = {
  id: 1,
  str: 'word1',
  meaning: 'meaning1',
  createdAt: new Date(1),
  updatedAt: new Date(1),
};

const mockRepository: Partial<Repository<Word>> = {
  find: async () => [word1],
};

describe('WordsController', () => {
  let controller: WordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordsController],
      providers: [
        WordsService,
        {
          provide: getRepositoryToken(Word),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<WordsController>(WordsController);
  });

  describe('findAll', () => {
    it('should return an array of words', async () => {
      const result = await controller.findAll();
      expect(result).toStrictEqual([word1]);
    });
  });
});
