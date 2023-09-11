import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CorporateService } from './corporate.service';
import { CreateCorporateDto } from './dto/create-corporate.dto';
import { UpdateCorporateDto } from './dto/update-corporate.dto';

@Controller('corporate')
export class CorporateController {
  constructor(private readonly corporateService: CorporateService) {}

  @Post()
  create(@Body() createCorporateDto: CreateCorporateDto) {
    return this.corporateService.create(createCorporateDto);
  }

  @Get()
  findAll() {
    return this.corporateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corporateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCorporateDto: UpdateCorporateDto,
  ) {
    return this.corporateService.update(+id, updateCorporateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corporateService.remove(+id);
  }
}
