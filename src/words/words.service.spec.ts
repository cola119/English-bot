import { Test, TestingModule } from '@nestjs/testing';
import { WordsService } from './words.service';
import { Word } from './entity/word.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const word1: Word = { id: 1, str: 'word1', meaning: 'meaning1' };

const mockRepository: Partial<Repository<Word>> = {
  find: async () => [word1],
};

describe('WordsService', () => {
  let service: WordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WordsService,
        {
          provide: getRepositoryToken(Word),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<WordsService>(WordsService);
  });

  describe('findAll', () => {
    it('should return an array of words', async () => {
      const result = await service.findAll();
      expect(result).toStrictEqual([word1]);
    });
  });
});
