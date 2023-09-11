import { Test, TestingModule } from "@nestjs/testing";
import { ApprouveProductsService } from "./approuve-products.service";

describe("ApprouveProductsService", () => {
  let service: ApprouveProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprouveProductsService]
    }).compile();

    service = module.get<ApprouveProductsService>(ApprouveProductsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
