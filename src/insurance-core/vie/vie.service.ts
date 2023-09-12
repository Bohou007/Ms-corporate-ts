import { Injectable } from '@nestjs/common';
import { HelpersService } from '../../common/helpers/helpers.service';
import { ServicesApiExternes } from '../../common/services-api-externes/services-api-externes.service';
import { config } from '../../config/config.constant';
import { appConstants } from '../../config/app.constants';
import { encode } from 'base-64';
import { Product } from './interfaces/product.interface';
import { Police } from './interfaces/police.interface';
import { Reglement } from './interfaces/reglement.interface';
import { Prevision } from "./interfaces/previsions.interface";
import { Adherent } from "./interfaces/adherent.interface";

@Injectable()
export class VieService {
  constructor(
    private readonly helpersService: HelpersService,
    private readonly serviceApi: ServicesApiExternes,
  ) {}
  async findInsuranceCorporate(country_code: string) {
    const url = this.getURI(country_code);
    const options = this.getOptionsConfig();
    return await this.serviceApi.get(url + config.corporateList, options);
  }

  async findInsuranceProduct(product: Product) {
    const url = this.getURI(product.country_code);
    const options = this.getOptionsConfig();
    console.log(url + config.corporateProductList, options, url);
    return await this.serviceApi.post(
      url + config.corporateProductList,
      product,
      options,
    );
  }

  async findInsuranceProductPolice(police: Police) {
    const url = this.getURI(police.country_code);
    const options = this.getOptionsConfig();
    console.log(url + config.productPoliceList, options, url);
    return await this.serviceApi.post(
      url + config.productPoliceList,
      police,
      options,
    );
  }

  async findInsurancePoliceReglement(reglement: Reglement) {
    const url = this.getURI(reglement.country_code);
    const options = this.getOptionsConfig();
    const res = await this.serviceApi.post(
      url + config.policeReglementList,
      reglement,
      options,
    );
    console.log(res);
    return res;
  }

  async findInsurancePolicePrevision(prevision: Prevision) {
    const url = this.getURI(prevision.country_code);
    const options = this.getOptionsConfig();
    const res = await this.serviceApi.post(
      url + config.policePrevisionsMathsDetail,
      prevision,
      options,
    );
    console.log(res);
    return res;
  }

  async findInsurancePoliceAdherent(adherent: Adherent) {
    const url = this.getURI(adherent.country_code);
    const options = this.getOptionsConfig();
    const res = await this.serviceApi.post(
      url + config.adherentDetail,
      adherent,
      options,
    );
    console.log(res);
    return res;
  }

  async findInsuranceProductAdherent(product: Product) {
    const url = this.getURI(product.country_code);
    const options = this.getOptionsConfig();
    const res = await this.serviceApi.post(
      url + config.productAdherent,
      product,
      options,
    );
    console.log(res);
    return res;
  }

  // Helpers function
  getURI(country_code: string) {
    return this.helpersService.getCountryURL(
      country_code,
      config.SERVER_BACK_JAVA,
      'consultation',
    );
  }

  getOptionsConfig() {
    return {
      headers: {
        Authorization:
          'Basic ' +
          encode(
            appConstants.GATEWAY_USERNAME + ':' + appConstants.GATEWAY_PASSWORD,
          ),
        Host: appConstants.HOST,
      },
    };
  }
}
