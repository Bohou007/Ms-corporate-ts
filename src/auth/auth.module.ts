import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { HelpersService } from '../common/helpers/helpers.service';
import { ServicesApiExternes } from '../common/services-api-externes/services-api-externes.service';
import { AuthController } from './auth.controller';

import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],

  providers: [
    AuthService,
    HelpersService,
    ServicesApiExternes,
    UsersService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
