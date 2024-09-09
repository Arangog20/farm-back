import { Test, TestingModule } from '@nestjs/testing';
import { PenController } from './pen.controller';
import { PenService } from './pen.service';

describe('PenController', () => {
  let controller: PenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PenController],
      providers: [PenService],
    }).compile();

    controller = module.get<PenController>(PenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
