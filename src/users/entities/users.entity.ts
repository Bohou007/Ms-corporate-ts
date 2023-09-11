
import {Corporate} from '../../corporate/entities/corporate.entity'


export class Users {
  id: number ;
uuid: string ;
first_name: string ;
last_name: string ;
email: string ;
password: string ;
role_code: string ;
status: boolean ;
is_password_updated: boolean ;
is_enable: boolean ;
is_already_signup: boolean ;
login_attempts: number ;
login_attempt_time: bigint ;
Corporate?: Corporate  | null;
corporateId: number  | null;
}
