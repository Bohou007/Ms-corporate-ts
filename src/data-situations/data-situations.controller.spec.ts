import { Test, TestingModule } from "@nestjs/testing";
import { DataSituationsController } from "./data-situations.controller";
import { DataSituationsService } from "./data-situations.service";

describe("DataSituationsController", () => {
  let controller: DataSituationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSituationsController],
      providers: [DataSituationsService]
    }).compile();

    controller = module.get<DataSituationsController>(DataSituationsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
