import gon from './mobile/resources/gon';
import bundle from './mobile/bundle';

ReactApp.start({
  locale: gon.locale,
  userID: gon.user.id,
  userToken: gon.user.api_key.access_token
});