import { PartialType } from '@nestjs/mapped-types';
import { CreateDataSituationDto } from './create-data-situation.dto';

export class UpdateDataSituationDto extends PartialType(
  CreateDataSituationDto,
) {
  exercice?: string;
  police?: string;
  typeCompte?: string;
  soldePrec?: string;
  pbPrec?: string;
  cotiExo?: string;
  rachExo?: string;
  soldeExo?: string;
  pbExo?: string;
  intg?: string;
}
