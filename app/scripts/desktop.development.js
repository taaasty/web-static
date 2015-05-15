import AppStorage from './desktop/resources/AppStorage';
import bundle from './desktop/bundle';

gon.env = 'development';

Tasty.start({
  locale: gon.locale,
  user: gon.user,
  flashes: gon.flashes
});