import { Corporate } from '../../corporate/entities/corporate.entity';

export class Users {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_code: string;
  status: boolean;
  token: string | null;
  is_password_updated: boolean | null;
  is_enable: boolean;
  is_already_signup?: boolean | null;
  login_attempts?: number | null;
  login_attempt_time?: string | null;
  Corporate?: Corporate | null;
  corporateId: number | null;
}
