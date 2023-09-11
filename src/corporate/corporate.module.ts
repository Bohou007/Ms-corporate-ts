import { Module } from '@nestjs/common';
import { CorporateService } from './corporate.service';
import { CorporateController } from './corporate.controller';
import { UsersService } from '../users/users.service';
import { ApprouveProductsService } from '../approuve-products/approuve-products.service';

import { HelpersService } from '../common/helpers/helpers.service';
import { ServicesApiExternes } from '../common/services-api-externes/services-api-externes.service';
@Module({
  controllers: [CorporateController],
  providers: [
    CorporateService,
    UsersService,
    ApprouveProductsService,
    HelpersService,
    ServicesApiExternes,
  ],
})
export class CorporateModule {}
