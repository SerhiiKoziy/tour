const { resolve } = require('path');

module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  // debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  // localePath,
  localePath: resolve('./apps/ecomm-app/public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
