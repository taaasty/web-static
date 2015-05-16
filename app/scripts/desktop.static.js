global.AppStorage = require('./shared/resources/AppStorage');
global.gon = require('./desktop/resources/gon');
require('./desktop/bundle');

if (AppStorage.getItem('userLogged') == 'true') {
  let { locale, user } = gon;
  Tasty.start({locale, user});
} else {
  console.log('Без пользователя');
  Tasty.start();
}