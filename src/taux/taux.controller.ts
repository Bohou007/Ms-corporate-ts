import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TauxService } from './taux.service';
import { CreateTauxDto } from './dto/create-taux.dto';
import { UpdateTauxDto } from './dto/update-taux.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('taux')
export class TauxController {
  constructor(private readonly tauxService: TauxService) {}

  @Post()
  create(@Body() createTauxDto: CreateTauxDto) {
    return this.tauxService.create(createTauxDto);
  }

  @Post('upload')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.tauxService.uploadFile(file);
  }

  @Get()
  findAll() {
    return this.tauxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tauxService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTauxDto: UpdateTauxDto) {
    return this.tauxService.update(+id, updateTauxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tauxService.remove(+id);
  }
}
