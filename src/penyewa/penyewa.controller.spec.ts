import { Test, TestingModule } from '@nestjs/testing';
import { PenyewaController } from './penyewa.controller';

describe('PenyewaController', () => {
  let controller: PenyewaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PenyewaController],
    }).compile();

    controller = module.get<PenyewaController>(PenyewaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
