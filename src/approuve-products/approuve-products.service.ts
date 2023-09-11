import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateApprouveProductDto } from './dto/create-approuve-product.dto';
import { UpdateApprouveProductDto } from './dto/update-approuve-product.dto';

import { PrismaClient } from '@prisma/client';
import { DataSituation } from "../data-situations/entities/data-situation.entity";

const prisma = new PrismaClient();

@Injectable()
export class ApprouveProductsService {
  async create(createApprouveProductDto: CreateApprouveProductDto) {
    const result = [];
    for (const row of createApprouveProductDto.product) {
      const dataProduct = {
        product_code_core: row.product_code_core,
        product_name: row.product_name,
        product_code: row.product_code,
        corporateId: createApprouveProductDto.corporateId,
      };
      const resData = await prisma.approuveProducts.create({
        data: dataProduct,
      });
      result.push(resData);
    }
    return result;
  }
  findAll() {
    return prisma.approuveProducts.findMany({
      include: {
        Corporate: true,
        DataSituations: true,
        Taux: true,
      },
    });
  }

  filter(data: any) {
    return prisma.approuveProducts.findMany({
      where: data,
      include: {
        Corporate: true,
        DataSituations: true,
        Taux: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await prisma.approuveProducts.findUnique({
      where: {
        id: id,
      },
      include: {
        Corporate: true,
        DataSituations: true,
        Taux: true,
      },
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  update(id: number, updateApprouveProductDto: UpdateApprouveProductDto) {
    return `This action updates a #${id} approuveProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} approuveProduct`;
  }
}
