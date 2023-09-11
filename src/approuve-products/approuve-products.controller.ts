import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApprouveProductsService } from "./approuve-products.service";
import { CreateApprouveProductDto } from "./dto/create-approuve-product.dto";
import { UpdateApprouveProductDto } from "./dto/update-approuve-product.dto";

@Controller('approuve-products')
export class ApprouveProductsController {
  constructor(private readonly approuveProductsService: ApprouveProductsService) {
  }

  @Post()
  create(@Body() createApprouveProductDto: CreateApprouveProductDto) {
    return this.approuveProductsService.create(createApprouveProductDto);
  }

  @Get()
  findAll() {
    return this.approuveProductsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.approuveProductsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateApprouveProductDto: UpdateApprouveProductDto) {
    return this.approuveProductsService.update(+id, updateApprouveProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.approuveProductsService.remove(+id);
  }
}
