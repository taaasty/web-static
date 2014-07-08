ApiUrls =
  host:     'http://3000.vkontraste.ru/'
  api_host: 'http://3000.vkontraste.ru/'

ApiRoutes =
  omniauth_url:          (provider) -> ApiUrls.host + 'auth/' + provider

  followings_url:          (tlogId) -> ApiUrls.api_host + 'api/v1/tlog/'+tlogId+'/followings'
  calendar_url:            (tlogId) -> ApiUrls.api_host + 'api/v1/tlog/' + tlogId + '/calendar'
  votes_url:              (entryId) -> ApiUrls.api_host + 'api/v1/entries/' +entryId + '/votes'
  embed_url:                        -> ApiUrls.api_host + 'api/v1/embed'
  post_url:                  (type) -> ApiUrls.api_host + 'api/v1/entries/' + type
  design_settings_url:       (slug) -> ApiUrls.api_host + 'api/v1/design_settings/' +slug
  design_settings_cover_url: (slug) -> ApiUrls.api_host + 'api/v1/design_settings/' +slug + '/cover'
  signin_url:                       -> ApiUrls.api_host + 'api/v1/sessions'
  signup_url:                       -> ApiUrls.api_host + 'api/v1/users'
  update_profile_url:               -> ApiUrls.api_host + 'api/v1/users' # method put
  recovery_url:                     -> ApiUrls.api_host + 'api/v1/users/password/recovery'
  request_confirm_url:              -> ApiUrls.api_host + 'api/v1/users/confirmation'
  userpic_url:                      -> ApiUrls.api_host + 'api/v1/users/userpic'

window.Routes.api = ApiRoutes