import { Test, TestingModule } from '@nestjs/testing';
import { PenyewaService } from './penyewa.service';

describe('PenyewaService', () => {
  let service: PenyewaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PenyewaService],
    }).compile();

    service = module.get<PenyewaService>(PenyewaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
