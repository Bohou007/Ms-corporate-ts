
import {Users} from '../../users/entities/users.entity'
import {ApprouveProducts} from '../../approuveProducts/entities/approuveProducts.entity'
import {DataSituations} from '../../dataSituations/entities/dataSituations.entity'
import {Taux} from '../../taux/entities/taux.entity'


export class Corporate {
  id: number ;
uuid: string ;
name: string ;
country_code: string ;
is_enable: boolean ;
disabledAt: Date  | null;
createdAt: Date ;
updatedAt: Date ;
Users?: Users[] ;
ApprouveProducts?: ApprouveProducts[] ;
DataSituations?: DataSituations[] ;
Taux?: Taux[] ;
}
