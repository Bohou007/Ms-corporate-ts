import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VieService } from './vie.service';
import { Product } from './interfaces/product.interface';
import { Police } from './interfaces/police.interface';
import { Reglement } from './interfaces/reglement.interface';
import { Prevision } from './interfaces/previsions.interface';
import { Adherent } from './interfaces/adherent.interface';

@Controller('insurance-core/vie')
export class VieController {
  constructor(private readonly vieService: VieService) {}
  @Get('corporate/:country_code')
  findAllCorporate(@Param('country_code') country_code: string) {
    return this.vieService.findInsuranceCorporate(country_code);
  }

  @Post('product')
  findAllProduct(@Body() product: Product) {
    return this.vieService.findInsuranceProduct(product);
  }

  @Post('polices')
  findAllProductPolicies(@Body() police: Police) {
    return this.vieService.findInsuranceProductPolice(police);
  }
  @Post('reglements')
  findAllPoliciesReglement(@Body() reglement: Reglement) {
    return this.vieService.findInsurancePoliceReglement(reglement);
  }

  @Post('previsions-mathematics')
  findAllPoliciesPrevisions(@Body() prevision: Prevision) {
    return this.vieService.findInsurancePolicePrevision(prevision);
  }

  @Post('details/adherent-police')
  findPolicieAdherent(@Body() adherent: Adherent) {
    return this.vieService.findInsurancePoliceAdherent(adherent);
  }
}
