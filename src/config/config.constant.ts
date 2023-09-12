const base_url = 'http://10.12.13.19';
export const config = {
  mailRegister: base_url + ':5100/api/partners/mail-registration',
  authenticate: base_url + ':9011/selfcare-ms-authenticate/token',
  rolePermission:
    base_url + ':9009/selfcare-ms-role-permission/role/permission/',
  front: base_url + ':8000/#/auth/corporate/signin/',
  filialeCode: base_url + ':5050/api/filiales/code-filiales/',

  // Host Insurance Life
  SERVER_BACK_JAVA: 'http://172.16.0.4:8000',
  corporateList: '/api/v1/life/corporate/societes',
  corporateProductList: '/api/v1/life/corporate/produits',
  productPoliceList: '/api/v1/life/corporate/polices',
  policeReglementList: '/api/v1/life/corporate/reglements',
  policePrevisionsMathsDetail: '/api/v1/life/corporate/previsionsMaths',
  adherentDetail: '/api/v1/life/corporate/details/personne',
};
