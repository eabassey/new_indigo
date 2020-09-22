// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  azure: {
    clientId: '4ab69d74-27cb-49bc-b095-f7bf6332a636',
    loginUrl: 'v1/auth/azure/login',
    codeForTokenExchangeUrl: 'v1/auth/azure/'
  },
  branding: {
    logo_url: '',
    byline: 'Enterprise Claims & Supplier Management Platform'
  },
  useMultipleLogins: false,
  api_url: 'https://sildev.4-sure.net:10000/api/',
  // api_url: 'http://localhost:3000',
  base_url: 'https://sildev.4-sure.net:10000/',
  // base_url: 'http://localhost:4200/',
  google_maps_api_key: 'AIzaSyA28JqiZDQ8_CYVbdLKsrA-l_E0iDkW0pw',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
