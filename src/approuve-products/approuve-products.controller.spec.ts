import { Test, TestingModule } from "@nestjs/testing";
import { ApprouveProductsController } from "./approuve-products.controller";
import { ApprouveProductsService } from "./approuve-products.service";

describe("ApprouveProductsController", () => {
  let controller: ApprouveProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprouveProductsController],
      providers: [ApprouveProductsService]
    }).compile();

    controller = module.get<ApprouveProductsController>(ApprouveProductsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
