global.AppStorage = require('./shared/resources/AppStorage');
global.gon = require('./mobile/resources/gon');
require('./mobile/bundle');

ReactApp.start({
  locale: gon.locale,
  userID: gon.user ? gon.user.id : null,
  userToken: gon.user ? gon.user.api_key.access_token : null
});