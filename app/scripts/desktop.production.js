global.AppStorage = require('./shared/resources/AppStorage');
import bundle from './desktop/bundle';

gon.env = 'production';

Tasty.start({
  locale: gon.locale,
  user: gon.user,
  flashes: gon.flashes
});