





export class UpdateUsersDto {
  first_name?: string;
last_name?: string;
email?: string;
password?: string;
role_code?: string;
is_password_updated?: boolean;
is_already_signup?: boolean;
login_attempts?: number;
login_attempt_time?: bigint;
}
