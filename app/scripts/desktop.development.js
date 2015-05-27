global.AppStorage = require('./shared/resources/AppStorage');
require('./desktop/bundle');

gon.env = 'development';
gon.thumbor = 'http://thumbor0.tasty0.ru';
gon.thumbor_http_loader = 'http://thumbor4.tasty0.ru';

Tasty.start({
  locale: gon.locale,
  user: gon.user,
  flashes: gon.flashes
});