import { Test, TestingModule } from '@nestjs/testing';
import { PengembalianController } from './pengembalian.controller';
import { PengembalianService } from './pengembalian.service';

describe('PengembalianController', () => {
  let controller: PengembalianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PengembalianController],
      providers: [PengembalianService],
    }).compile();

    controller = module.get<PengembalianController>(PengembalianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
