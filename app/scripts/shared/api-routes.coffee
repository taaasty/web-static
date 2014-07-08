ApiRoutes =
  omniauth_url:          (provider) -> Tasty.host + 'auth/' + provider

  followings_url:          (tlogId) -> Tasty.api_host + 'api/v1/tlog/'+tlogId+'/followings'
  calendar_url:            (tlogId) -> Tasty.api_host + 'v1/tlog/'+ tlogId + '/calendar'
  votes_url:              (entryId) -> Tasty.api_host + 'api/v1/entries/' +entryId + '/votes'
  embed_url:                        -> Tasty.api_host + 'api/v1/embed'
  post_url:                  (type) -> Tasty.api_host + 'api/v1/entries/' + type
  design_settings_url:       (slug) -> Tasty.api_host + 'api/v1/design_settings/' +slug
  design_settings_cover_url: (slug) -> Tasty.api_host + 'api/v1/design_settings/' +slug + '/cover'
  signin_url:                       -> Tasty.api_host + 'api/v1/sessions'
  signup_url:                       -> Tasty.api_host + 'api/v1/users'
  update_profile_url:               -> Tasty.api_host + 'api/v1/users' # method put
  recovery_url:                     -> Tasty.api_host + 'api/v1/users/password/recovery'
  request_confirm_url:              -> Tasty.api_host + 'api/v1/users/confirmation'
  userpic_url:                      -> Tasty.api_host + 'api/v1/users/userpic'

window.Routes.api = ApiRoutes