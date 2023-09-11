import { Test, TestingModule } from '@nestjs/testing';
import { ServicesApiExternes } from './services-api-externes.service';

describe('ServicesApiExternesService', () => {
  let service: ServicesApiExternes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicesApiExternes],
    }).compile();

    service = module.get<ServicesApiExternes>(ServicesApiExternes);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
