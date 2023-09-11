import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsInt, IsEmpty } from 'class-validator';
export class CreateUsersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role_code: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  corporateId: number;

  token?: string;
  is_password_updated?: boolean;
  is_already_signup?: boolean;
  login_attempts?: number;
  login_attempt_time?: string;
}
