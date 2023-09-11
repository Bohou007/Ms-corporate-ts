import { Corporate } from '../../corporate/entities/corporate.entity';
import { Taux } from '../../taux/entities/taux.entity';
import { DataSituation } from '../../data-situations/entities/data-situation.entity';

export class ApprouveProducts {
  id: number;
  uuid: string;
  product_code_core: string;
  product_name: string;
  product_code: string;
  is_enable: boolean;
  Corporate?: Corporate | null;
  corporateId: number | null;
  Taux?: Taux[];
  DataSituations?: DataSituation[];
}