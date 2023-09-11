const base_url = 'http://10.12.13.19';
export const config = {
  mailRegister: base_url + ':5100/api/partners/mail-registration',
  authenticate: base_url + ':9011/selfcare-ms-authenticate/token',
  rolePermission:
    base_url + ':9009/selfcare-ms-role-permission/role/permission/',
  front: base_url + ':8000/#/auth/corporate/signin/',
};
