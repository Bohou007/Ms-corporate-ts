import { Corporate } from '../../corporate/entities/corporate.entity';
import { ApprouveProducts } from '../../approuve-products/entities/approuve-product.entity';
import { DataSituation } from '../../data-situations/entities/data-situation.entity';

export class Taux {
  id: number;
  exercice: string;
  produit: string;
  tauxUA: string;
  tauxAXA: string;
  tauxRevalo: string;
  Corporate?: Corporate | null;
  corporateId: number | null;
  ApprouveProducts?: ApprouveProducts | null;
  approuveProductsId: number | null;
  DataSituations?: DataSituation[];
}
