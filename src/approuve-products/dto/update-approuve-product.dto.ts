import { PartialType } from '@nestjs/mapped-types';
import { CreateApprouveProductDto } from './create-approuve-product.dto';

export class UpdateApprouveProductDto extends PartialType(
  CreateApprouveProductDto,
) {
  product_code_core?: string;
  product_name?: string;
  product_code?: string;
  corporateId?: number;
}
