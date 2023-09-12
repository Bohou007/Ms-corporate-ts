import { Users } from '../../users/entities/users.entity';
import { ApprouveProducts } from '../../approuve-products/entities/approuve-product.entity';
import { DataSituation } from '../../data-situations/entities/data-situation.entity';
import { Taux } from '../../taux/entities/taux.entity';

import {
  IsInt,
  IsDefined,
  IsString,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';

export class Corporate {
  @IsDefined()
  @IsInt()
  id!: number;

  @IsDefined()
  @IsString()
  uuid!: string;

  @IsDefined()
  @IsString()
  name!: string;

  @IsDefined()
  @IsString()
  code_souscripteur: string;

  @IsDefined()
  @IsString()
  souscripteur_name: string;

  @IsDefined()
  @IsString()
  country_code!: string;

  @IsDefined()
  @IsBoolean()
  is_enable!: boolean;

  @IsOptional()
  @IsDate()
  disabledAt?: Date;

  @IsDefined()
  @IsDate()
  createdAt!: Date;

  @IsDefined()
  @IsDate()
  updatedAt!: Date;

  @IsDefined()
  Users!: Users[];

  @IsDefined()
  ApprouveProducts!: ApprouveProducts[];

  @IsDefined()
  DataSituations!: DataSituation[];

  @IsDefined()
  Taux!: Taux[];
}
