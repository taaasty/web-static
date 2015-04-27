import gon from './desktop/resources/gon';
import bundle from './desktop/bundle';

if (localStorage.getItem('userLogged') == 'true') {
  let { locale, user } = gon;
  Tasty.start({locale, user});
} else {
  console.log('Без пользователя');
  Tasty.start();
}