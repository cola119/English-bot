import { Test, TestingModule } from '@nestjs/testing';
import { WordsService } from './words.service';
import { Word } from './entity/word.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const word1: Word = { id: 1, str: 'word1', meaning: 'meaning1' };

const mockRepository: Partial<Repository<Word>> = {
  find: async () => [word1],
  findOne: async () => word1,
  update: async () => null,
  delete: async () => null,
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

  describe('findById', () => {
    it('should return a word that matches given id', async () => {
      const result = await service.findById(1);
      expect(result).toStrictEqual(word1);
    });
  });

  describe('update', () => {
    it('should update a word that matches given id', async () => {
      const result = await service.update(1, word1);
      expect(result).toBe(null);
    });
  });

  describe('delete', () => {
    it('should delete a word that matches given id', async () => {
      const result = await service.delete(1);
      expect(result).toBe(null);
    });
  });
});
