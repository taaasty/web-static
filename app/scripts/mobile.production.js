import AppStorage from './shared/resources/AppStorage';
global.AppStorage = AppStorage;

require('./mobile/bundle');

gon.env = 'production';

ReactApp.start({
  locale: gon.locale,
  user: gon.user,
  registerProvider: gon.register_provider,
});
