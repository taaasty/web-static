global.AppStorage = require('./shared/resources/AppStorage');
import gon from './mobile/resources/gon';
import bundle from './mobile/bundle';

ReactApp.start({
  locale: gon.locale,
  userID: gon.user ? gon.user.id : null,
  userToken: gon.user ? gon.user.api_key.access_token : null
});