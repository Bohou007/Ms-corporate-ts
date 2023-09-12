import { Test, TestingModule } from '@nestjs/testing';
import { VieService } from './vie.service';

describe('VieService', () => {
  let service: VieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VieService],
    }).compile();

    service = module.get<VieService>(VieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
