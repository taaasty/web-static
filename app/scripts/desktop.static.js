global.AppStorage = require('./desktop/resources/AppStorage');
import gon from './desktop/resources/gon';
import bundle from './desktop/bundle';

if (AppStorage.getItem('userLogged') == 'true') {
  let { locale, user } = gon;
  Tasty.start({locale, user});
} else {
  console.log('Без пользователя');
  Tasty.start();
}