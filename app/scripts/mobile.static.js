import AppStorage from './shared/resources/AppStorage';
import gon from './mobile/resources/gon';

global.AppStorage = AppStorage;
global.gon = gon;

require('./mobile/bundle');

ReactApp.start({
  locale: gon.locale,
  user: gon.user,
  registerProvider: gon.register_provider,
});
