import { Test, TestingModule } from '@nestjs/testing';
import { PenService } from './pen.service';

describe('PenService', () => {
  let service: PenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PenService],
    }).compile();

    service = module.get<PenService>(PenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
