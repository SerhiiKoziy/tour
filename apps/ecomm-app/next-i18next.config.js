const { resolve } = require('path');

// CODE to serve the translations according to the environment
const localePath =
  process.env.NODE_ENV === 'production'
    ? './public/locales'
    : './apps/ecomm-app/public/locales';

// Statement to be able to override the translations path if we run the prod build from local and our monorepo tool
// if you need to run nx run ecomm-app:serve:production, you may uncomment this code
// but please comment it our again when you are done with your tests
/*if (process.env.I18N_PATH) {
  localePath = process.env.I18N_PATH;
}*/

module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  // debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  //localePath,
  localePath: resolve(localePath),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
