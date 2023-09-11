import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { JwtService } from '@nestjs/jwt';

import { HelpersService } from '../common/helpers/helpers.service';
import { ServicesApiExternes } from '../common/services-api-externes/services-api-externes.service';
import { config } from '../config/config.constant';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(
    private readonly helpersService: HelpersService,
    private readonly serviceApi: ServicesApiExternes,
    private jwtService: JwtService,
  ) {}
  async create(createUsersDto: CreateUsersDto) {
    const password = await this.helpersService.getRandomPassword();
    createUsersDto.password = await this.helpersService.getHashPassword(
      password,
    );
    const user = await prisma.users.create({
      data: createUsersDto,
    });
    const payload = {
      sub: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      corporateId: user.corporateId,
    };
    const token = await this.jwtService.signAsync(payload);
    const fmtUserToken = { token: token };
    await this.update(user.id, fmtUserToken);
    const fmtUser = this.helpersService.formatUserToSendMail(user, token);
    fmtUser.password = password;
    const responseMail = await this.serviceApi.post(
      config.mailRegister,
      fmtUser,
    );
    console.log(responseMail);
    return user;
  }

  findAll() {
    return prisma.users.findMany({
      include: {
        Corporate: true,
      },
    });
  }

  filter(data: any) {
    return prisma.users.findMany({
      where: data,
      include: {
        Corporate: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      include: {
        Corporate: true,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async verifyStatus(user: any) {
    if (!user.status) {
      throw new HttpException(
        'User account was disable',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyEmailExist(user: any) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateUsersDto: UpdateUsersDto) {
    const user = await this.findOne(id);
    return prisma.users.update({
      where: {
        id: user.id,
      },
      data: updateUsersDto,
    });
  }

  async filterUpdate(data: any, updateUsersDto: UpdateUsersDto) {
    return prisma.users.update({
      where: data,
      data: updateUsersDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
