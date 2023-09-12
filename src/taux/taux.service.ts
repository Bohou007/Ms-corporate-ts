import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTauxDto } from './dto/create-taux.dto';
import { UpdateTauxDto } from './dto/update-taux.dto';
import * as fs from 'fs';
import * as papaparse from 'papaparse';
import { ApprouveProductsService } from '../approuve-products/approuve-products.service';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class TauxService {
  constructor(
    private readonly approuveProductsService: ApprouveProductsService,
  ) {}
  async create(createTauxDto: CreateTauxDto) {
    return prisma.taux.create({
      data: createTauxDto,
    });
  }

  findAll() {
    return `This action returns all taux`;
  }

  async findOne(id: number) {
    const taux = await prisma.taux.findUnique({
      where: {
        id: id,
      },
      include: {
        Corporate: true,
        ApprouveProducts: true,
      },
    });
    if (!taux) {
      throw new HttpException('Taux not found', HttpStatus.NOT_FOUND);
    }
    return taux;
  }

  async findFirst(data: any) {
    return prisma.taux.findFirst({
      where: data,
      include: {
        Corporate: true,
        ApprouveProducts: true,
      },
    });
  }

  async update(id: number, updateTauxDto: UpdateTauxDto) {
    const taux = await this.findOne(id);
    return prisma.taux.update({
      where: {
        id: taux.id,
      },
      data: updateTauxDto,
    });
  }

  async updateOrCreate(
    data: any,
    createTauxDto: CreateTauxDto,
    updateTauxDto: UpdateTauxDto,
  ) {
    return prisma.taux.upsert({
      create: createTauxDto,
      update: updateTauxDto,
      where: data,
    });
  }
  async uploadFile(file: Express.Multer.File) {
    const result = [];
    const csvData = fs.readFileSync(file.path, 'utf8');
    const parsedData = papaparse.parse(csvData, { header: true });
    console.log(parsedData.data);
    for (const row of parsedData.data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { Exercice, Produit, ...otherFields } = row;
      const data = {
        product_code_core: Produit,
      };
      const productData = await this.approuveProductsService.filter(data);
      const product = productData[0];
      if (product && product.corporateId !== null) {
        const formattedData = {
          exercice: Exercice.trim(),
          produit: Produit.trim(),
          tauxUA: otherFields.TauxUA.trim(),
          tauxAXA: otherFields.TauxAXA.trim(),
          tauxRevalo: otherFields.TauxRevalo.trim(),
          corporateId: product.corporateId,
          approuveProductsId: product.id,
        };
        console.log(formattedData);
        const dataTaux = {
          exercice: formattedData.exercice,
          produit: formattedData.produit,
        };
        const existingTaux = await this.findFirst(dataTaux);
        if (existingTaux) {
          const taux = await this.update(existingTaux.id, formattedData);
          console.log(taux);
          result.push(taux);
        } else {
          const taux = await this.create(formattedData);
          result.push(taux);
        }
      }
    }
    fs.unlinkSync(file.path);
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} taux`;
  }
}
