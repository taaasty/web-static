global.AppStorage = require('./shared/resources/AppStorage');
require('./desktop/bundle');

gon.env = 'development';

Tasty.start({
  locale: gon.locale,
  user: gon.user,
  flashes: gon.flashes
});