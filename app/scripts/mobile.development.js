import bundle from './mobile/bundle';

gon.env = 'development';

ReactApp.start({
  locale: gon.locale,
  userID: gon.user.id,
  userToken: gon.user.api_key.access_token
});