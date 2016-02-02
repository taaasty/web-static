import AppStorage from './shared/resources/AppStorage';
global.AppStorage = AppStorage;

require('./mobile/bundle');

gon.env = 'development';

ReactApp.start({
  locale: gon.locale,
  userID: gon.user ? gon.user.id : null,
  userToken: gon.user ? gon.user.api_key.access_token : null
});
