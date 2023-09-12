import { Module } from '@nestjs/common';
import { VieController } from './vie.controller';
import { VieService } from './vie.service';
import { HelpersService } from '../../common/helpers/helpers.service';
import { ServicesApiExternes } from '../../common/services-api-externes/services-api-externes.service';

@Module({
  controllers: [VieController],
  providers: [VieService, HelpersService, ServicesApiExternes],
})
export class VieModule {}
