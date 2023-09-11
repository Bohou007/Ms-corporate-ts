import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { DataSituationsService } from './data-situations.service';
import { CreateDataSituationDto } from './dto/create-data-situation.dto';
import { UpdateDataSituationDto } from './dto/update-data-situation.dto';

@Controller('data-situations')
export class DataSituationsController {
  constructor(private readonly dataSituationsService: DataSituationsService) {}

  @Post()
  create(@Body() createDataSituationDto: CreateDataSituationDto) {
    return this.dataSituationsService.create(createDataSituationDto);
  }

  @Post('upload')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.dataSituationsService.uploadFile(file);
  }

  @Get()
  findAll() {
    return this.dataSituationsService.findAll();
  }

  @Get('/corporate/:corporateId')
  findAllSituationsByCorporate(@Param('corporateId') corporateId: number) {
    return this.dataSituationsService.filter({
      corporateId: parseInt(String(corporateId)),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataSituationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDataSituationDto: UpdateDataSituationDto,
  ) {
    return this.dataSituationsService.update(+id, updateDataSituationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataSituationsService.remove(+id);
  }
}
