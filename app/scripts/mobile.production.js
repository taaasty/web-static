global.AppStorage = require('./shared/resources/AppStorage');
require('./mobile/bundle');

gon.env = 'production';
gon.thumbor = 'http://thumbor0.tasty0.ru';
gon.thumbor_http_loader = 'http://thumbor4.tasty0.ru';

ReactApp.start({
  locale: gon.locale,
  userID: gon.user ? gon.user.id : null,
  userToken: gon.user ? gon.user.api_key.access_token : null
});