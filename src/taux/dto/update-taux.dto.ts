import { PartialType } from '@nestjs/mapped-types';
import { CreateTauxDto } from './create-taux.dto';

export class UpdateTauxDto extends PartialType(CreateTauxDto) {
  exercice?: string;
  produit?: string;
  tauxUA?: string;
  tauxAXA?: string;
  tauxRevalo?: string;
}
