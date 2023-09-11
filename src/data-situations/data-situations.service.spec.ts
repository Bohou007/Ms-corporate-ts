import { Test, TestingModule } from "@nestjs/testing";
import { DataSituationsService } from "./data-situations.service";

describe("DataSituationsService", () => {
  let service: DataSituationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSituationsService]
    }).compile();

    service = module.get<DataSituationsService>(DataSituationsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
