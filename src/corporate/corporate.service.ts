import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCorporateDto } from './dto/create-corporate.dto';
import { UpdateCorporateDto } from './dto/update-corporate.dto';
import { UsersService } from '../users/users.service';
import { ApprouveProductsService } from '../approuve-products/approuve-products.service';

import { HelpersService } from '../common/helpers/helpers.service';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class CorporateService {
  constructor(
    private readonly usersService: UsersService,
    private readonly approuveProductsService: ApprouveProductsService,
    private readonly helpersService: HelpersService,
  ) {}

  async create(createCorporateDto: CreateCorporateDto) {
    const dataCorporate = {
      name: createCorporateDto.name,
      country_code: createCorporateDto.country_code,
      code_souscripteur: createCorporateDto.code_souscripteur,
    };
    const corporate = await prisma.corporate.create({
      data: dataCorporate,
    });
    if (!corporate) {
      throw new HttpException('Corporate not creat', HttpStatus.CREATED);
    }
    const dataUser = {
      first_name: createCorporateDto.first_name,
      last_name: createCorporateDto.last_name,
      email: createCorporateDto.email,
      role_code: createCorporateDto.role_code,
      password: '',
      corporateId: corporate.id,
    };
    const dataProduct = {
      product: createCorporateDto.product,
      corporateId: corporate.id,
    };
    await this.approuveProductsService.create(dataProduct);
    await this.usersService.create(dataUser);
    return await this.findOne(corporate.id);
  }

  findAll() {
    return prisma.corporate.findMany({
      include: {
        Users: true,
        ApprouveProducts: true,
        DataSituations: true,
        Taux: true,
      },
    });
  }

  filter(data: any) {
    return prisma.corporate.findMany({
      where: data,
      include: {
        Users: true,
        ApprouveProducts: true,
        DataSituations: true,
        Taux: true,
      },
    });
  }

  async findOne(id: number) {
    const corporate = await prisma.corporate.findUnique({
      where: {
        id: id,
      },
      include: {
        Users: true,
        ApprouveProducts: true,
        DataSituations: true,
        Taux: true,
      },
    });
    if (!corporate) {
      throw new HttpException('Corporate not found', HttpStatus.NOT_FOUND);
    }
    return corporate;
  }

  async update(id: number, updateCorporateDto: UpdateCorporateDto) {
    const corporate = await this.findOne(id);
    return prisma.corporate.update({
      where: {
        id: corporate.id,
      },
      data: updateCorporateDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} corporate`;
  }
}
