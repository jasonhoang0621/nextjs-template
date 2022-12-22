const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi']
  },
  localePath: path.resolve('./src/translation'),
  localeStructure: '{{lng}}',
  deefaultNS: '{{lng}}'
};
