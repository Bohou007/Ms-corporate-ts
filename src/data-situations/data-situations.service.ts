import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDataSituationDto } from './dto/create-data-situation.dto';
import { UpdateDataSituationDto } from './dto/update-data-situation.dto';
import { HelpersService } from '../common/helpers/helpers.service';
import * as fs from 'fs';
import * as papaparse from 'papaparse';

import { PrismaClient } from '@prisma/client';
import { TauxService } from '../taux/taux.service';
import { InputDataDTO } from './interfaces/InputDataDTO.interface';

const prisma = new PrismaClient();

@Injectable()
export class DataSituationsService {
  constructor(
    private readonly helpersService: HelpersService,
    private readonly tauxService: TauxService,
  ) {}
  async create(createDataSituationDto: CreateDataSituationDto) {
    console.log(createDataSituationDto);
    return prisma.dataSituations.create({
      data: createDataSituationDto,
    });
  }

  findAll() {
    return `This action returns all dataSituations`;
  }

  filter(data: any) {
    return prisma.dataSituations.findMany({
      where: data,
      include: {
        Taux: true,
        Corporate: true,
        ApprouveProducts: true,
      },
    });
  }

  async findOne(id: number) {
    const dataSituations = await prisma.dataSituations.findUnique({
      where: {
        id: id,
      },
      include: {
        Taux: true,
        Corporate: true,
        ApprouveProducts: true,
      },
    });
    if (!dataSituations) {
      throw new HttpException(
        'Data situations not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return dataSituations;
  }

  async findFirst(data: any) {
    return prisma.dataSituations.findFirst({
      where: data,
      include: {
        Taux: true,
        Corporate: true,
        ApprouveProducts: true,
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const result = [];
    const csvData = fs.readFileSync(file.path, 'utf8');
    const parsedData = papaparse.parse(csvData, { header: true });
    for (const row of parsedData.data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { Exercice, Police } = row;
      const product_code = this.helpersService.extractProductCode(Police);
      const existingSituations = await this.findFirst({
        exercice: Exercice,
        police: Police,
      });
      if (product_code !== null) {
        const dataTaux = {
          exercice: Exercice,
          produit: product_code,
        };
        const taux = await this.tauxService.findFirst(dataTaux);
        if (
          taux &&
          taux.corporateId !== null &&
          taux.approuveProductsId !== null
        ) {
          const dataSituation = this.helpersService.formatDataSituations(
            taux,
            <InputDataDTO>row,
          );
          if (existingSituations) {
            const situation = await this.update(
              existingSituations.id,
              dataSituation,
            );
            console.log(situation);
            result.push(situation);
          } else {
            const situation = await this.create(dataSituation);
            result.push(situation);
          }
        }
      }
    }

    fs.unlinkSync(file.path);
    return result;
  }

  async update(id: number, updateDataSituationDto: UpdateDataSituationDto) {
    const situation = await this.findOne(id);
    return prisma.dataSituations.update({
      where: {
        id: situation.id,
      },
      data: updateDataSituationDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} dataSituation`;
  }
}
