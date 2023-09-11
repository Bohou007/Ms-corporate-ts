import { Body, Controller, Param, Post, Put } from "@nestjs/common";

import { Login } from './interfaces/login.interface';
import { ResetPassword } from './interfaces/resetPassword.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() login: Login) {
    return this.authService.signIn(login);
  }

  @Put('/reset-password/:token')
  resetPassword(
    @Param('token') token: string,
    @Body() resetPassword: ResetPassword,
  ) {
    const data = {
      token: token,
    };
    return this.authService.updatePassword(data, resetPassword);
  }

  @Put('/update-password-first-login/:uuid')
  updatePasswordFirstLogin(
    @Param('uuid') uuid: string,
    @Body() resetPassword: ResetPassword,
  ) {
    const data = {
      uuid: uuid,
    };
    return this.authService.updatePassword(data, resetPassword);
  }
}
