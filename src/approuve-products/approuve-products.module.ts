import { Module } from '@nestjs/common';
import { ApprouveProductsService } from './approuve-products.service';
import { ApprouveProductsController } from './approuve-products.controller';

@Module({
  controllers: [ApprouveProductsController],
  providers: [ApprouveProductsService],
})
export class ApprouveProductsModule {}
