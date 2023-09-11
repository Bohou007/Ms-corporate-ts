import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { HelpersService } from '../common/helpers/helpers.service';
import { ServicesApiExternes } from '../common/services-api-externes/services-api-externes.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, HelpersService, ServicesApiExternes],
})
export class UsersModule {}
