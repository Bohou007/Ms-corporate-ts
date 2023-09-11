import { Module } from '@nestjs/common';
import { DataSituationsService } from './data-situations.service';
import { DataSituationsController } from './data-situations.controller';
import { MulterModule } from '@nestjs/platform-express';
import { HelpersService } from '../common/helpers/helpers.service';
import { TauxService } from '../taux/taux.service';
import { ApprouveProductsService } from '../approuve-products/approuve-products.service';
import { CorporateService } from '../corporate/corporate.service';
import { UsersService } from '../users/users.service';
import { ServicesApiExternes } from "../common/services-api-externes/services-api-externes.service";

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Set the destination folder for uploaded files
    }),
  ],
  controllers: [DataSituationsController],
  providers: [
    DataSituationsService,
    HelpersService,
    TauxService,
    ApprouveProductsService,
    CorporateService,
    UsersService,
    ServicesApiExternes,
  ],
})
export class DataSituationsModule {}
