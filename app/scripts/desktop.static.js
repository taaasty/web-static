import AppStorage from './shared/resources/AppStorage';
import gon from './desktop/resources/gon';

global.AppStorage = AppStorage;
global.gon = gon;

require('./desktop/bundle');

if (AppStorage.getItem('userLogged') == 'true') {
  let { locale, user } = gon;
  Tasty.start({locale, user});
} else {
  console.log('Без пользователя');
  Tasty.start();
}
