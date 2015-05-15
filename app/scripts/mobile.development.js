global.AppStorage = require('./shared/resources/AppStorage');
import bundle from './mobile/bundle';

gon.env = 'development';

ReactApp.start({
  locale: gon.locale,
  userID: gon.user ? gon.user.id : null,
  userToken: gon.user ? gon.user.api_key.access_token : null
});