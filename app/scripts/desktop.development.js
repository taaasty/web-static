import AppStorage from './shared/resources/AppStorage';

global.AppStorage = AppStorage;
require('./desktop/bundle');

gon.env = 'development';

Tasty.start({
  locale: gon.locale,
  user: gon.user,
  flashes: gon.flashes,
});
