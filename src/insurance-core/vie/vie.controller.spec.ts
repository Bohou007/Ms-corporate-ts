import { Test, TestingModule } from '@nestjs/testing';
import { VieController } from './vie.controller';

describe('VieController', () => {
  let controller: VieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VieController],
    }).compile();

    controller = module.get<VieController>(VieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
