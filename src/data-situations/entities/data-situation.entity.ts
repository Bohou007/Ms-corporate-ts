import { Corporate } from '../../corporate/entities/corporate.entity';
import { Taux } from '../../taux/entities/taux.entity';
import { ApprouveProducts } from '../../approuve-products/entities/approuve-product.entity';

export class DataSituation {
  id: number;
  exercice: string;
  police: string;
  typeCompte: string;
  soldePrec: string;
  pbPrec: string;
  cotiExo: string;
  rachExo: string;
  soldeExo: string;
  pbExo: string;
  intg: string;
  Corporate?: Corporate | null;
  corporateId: number | null;
  Taux?: Taux | null;
  tauxId: number | null;
  ApprouveProducts?: ApprouveProducts | null;
  approuveProductsId: number | null;
}
