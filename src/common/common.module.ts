import { Module } from '@nestjs/common';
import { HelpersService } from './helpers/helpers.service';
import { ServicesApiExternes } from './services-api-externes/services-api-externes.service';

@Module({
  providers: [HelpersService, ServicesApiExternes],
})
export class CommonModule {}
