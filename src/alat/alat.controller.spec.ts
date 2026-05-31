import { Test, TestingModule } from '@nestjs/testing';
import { AlatController } from './alat.controller';
import { AlatService } from './alat.service';

describe('AlatController', () => {
  let controller: AlatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlatController],
      providers: [AlatService],
    }).compile();

    controller = module.get<AlatController>(AlatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
