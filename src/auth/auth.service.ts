import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Login } from './interfaces/login.interface';
import { ResetPassword } from './interfaces/resetPassword.interface';
import { UsersService } from '../users/users.service';
import { HelpersService } from '../common/helpers/helpers.service';
import { ServicesApiExternes } from '../common/services-api-externes/services-api-externes.service';
import { config } from '../config/config.constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly helpersService: HelpersService,
    private readonly serviceApi: ServicesApiExternes,
  ) {}
  async signIn(login: Login) {
    const data = {
      email: login.email,
    };
    const result = await this.usersService.filter(data);
    const user = result[0];
    await this.usersService.verifyEmailExist(user);
    await this.usersService.verifyStatus(user);
    const validPassword = await this.helpersService.comparePassword(
      login.password,
      user.password,
    );
    await this.verifyValidAuth(validPassword, user);
    const fmt_data = { email: user.email, profil: 'corporate' };
    const responseToken: any = await this.serviceApi.post(
      config.authenticate,
      fmt_data,
    );
    const auth = {
      headers: {
        Authorization: `Bearer ${responseToken.token}`,
        profil: 'corporate',
      },
    };
    const url = config.rolePermission + user.role_code;
    const permission = await this.serviceApi.get(url, auth);
    return {
      ...user,
      token: responseToken.token,
      Permissions: permission,
    };
  }

  async updatePassword(data: any, resetPassword: ResetPassword) {
    console.log(data);
    if (!data) {
      throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
    }
    if (resetPassword.newPassword !== resetPassword.confirmPassword) {
      throw new HttpException(
        'New password and confirm password have not the same value',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const errors = await this.helpersService.verifyPasswordPolicies(
      resetPassword.newPassword,
    );
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    const passwordHash = await this.helpersService.getHashPassword(
      resetPassword.newPassword,
    );
    const fmtUserData = {
      password: passwordHash,
      status: true,
      is_enable: true,
      login_attempts: 0,
      login_attempt_time: '',
    };
    return await this.usersService.filterUpdate(data, fmtUserData);
  }

  async verifyValidAuth(validPassword: boolean, user: any) {
    if (!validPassword) {
      if (user.login_attempts == 2) {
        const current =
          user.login_attempts == null ? 1 : user.login_attempts + 1;
        const data = {
          login_attempt_time: String(Date.now()),
          login_attempts: current,
        };
        await this.usersService.update(user.id, data);
        throw new HttpException(
          'Vous avez trois (3) tentatives de connexion infructueuses, Veillez réessayer dans une minute',
          HttpStatus.BAD_REQUEST,
        );
      } else if (user.login_attempts == 3) {
        const current =
          user.login_attempts == null ? 1 : user.login_attempts + 1;
        const data = {
          login_attempt_time: String(Date.now()),
          status: false,
          is_enable: false,
          login_attempts: current,
        };
        await this.usersService.update(user.id, data);
        throw new HttpException(
          'Votre compte a été verrouillé. Pour le réactiver cliquez sur "Mot de passe oublié ou Compte bloqué ?',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const current =
          user.login_attempts == null ? 1 : user.login_attempts + 1;
        const data = { login_attempts: current };
        await this.usersService.update(user.id, data);
        throw new HttpException(
          'Email or password incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      const data = { login_attempts: 0, login_attempt_time: '0' };
      await this.usersService.update(user.id, data);
    }
  }
}
