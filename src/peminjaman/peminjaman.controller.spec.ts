import { Test, TestingModule } from '@nestjs/testing';
import { PeminjamanController } from './peminjaman.controller';
import { PeminjamanService } from './peminjaman.service';

describe('PeminjamanController', () => {
  let controller: PeminjamanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeminjamanController],
      providers: [PeminjamanService],
    }).compile();

    controller = module.get<PeminjamanController>(PeminjamanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
