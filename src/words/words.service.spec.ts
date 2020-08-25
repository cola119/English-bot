import { Test, TestingModule } from '@nestjs/testing';
import { WordsService } from './words.service';

describe('WordsService', () => {
  let service: WordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordsService],
    }).compile();

    service = module.get<WordsService>(WordsService);
  });

  describe('findAll', () => {
    it('should return an array of words', () => {
      expect(service.findAll()).toStrictEqual([{ str: 'Hello' }]);
    });
  });
});
