import { Test, TestingModule } from '@nestjs/testing';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { Word } from './entity/word.entity';

const word1: Word = { str: 'word1' };

describe('WordsController', () => {
  let controller: WordsController;
  let service: WordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordsController],
      providers: [WordsService],
    }).compile();

    controller = module.get<WordsController>(WordsController);
    service = module.get<WordsService>(WordsService);
  });

  describe('findAll', () => {
    it('should return an array of words', () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => [word1]);
      expect(controller.findAll()).toStrictEqual([word1]);
    });
  });
});
