import { Module } from '@nestjs/common';
import { TauxService } from './taux.service';
import { TauxController } from './taux.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ApprouveProductsService } from '../approuve-products/approuve-products.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Set the destination folder for uploaded files
    }),
  ],
  controllers: [TauxController],
  providers: [TauxService, ApprouveProductsService],
})
export class TauxModule {}
