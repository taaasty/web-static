ApiRoutes =
  omniauth_url:          (provider) -> TastySettings.host + 'auth/' + provider

  calendar_url:            (tlogId) -> TastySettings.api_host + 'v1/tlog/' + tlogId + '/calendar'
  relationships_summary_url:        -> TastySettings.api_host + 'v1/relationships/summary'
  votes_url:              (entryId) -> TastySettings.api_host + 'v1/entries/' + entryId + '/votes'
  embed_url:                        -> TastySettings.api_host + 'v1/embed'
  post_url:                  (type) -> TastySettings.api_host + 'v1/entries/' + type
  design_settings_url:       (slug) -> TastySettings.api_host + 'v1/design_settings/' + slug 
  design_settings_cover_url: (slug) -> TastySettings.api_host + 'v1/design_settings/' + slug + '/cover'
  signin_url:                       -> TastySettings.api_host + 'v1/sessions'
  signup_url:                       -> TastySettings.api_host + 'v1/users'
  update_profile_url:               -> TastySettings.api_host + 'v1/users' # method put
  recovery_url:                     -> TastySettings.api_host + 'v1/users/password/recovery'
  request_confirm_url:              -> TastySettings.api_host + 'v1/users/confirmation'
  userpic_url:                      -> TastySettings.api_host + 'v1/users/userpic'

  entry_url:              (entryId) -> TastySettings.api_host + 'v1/entries/' + entryId

  get_my_relationship_url:     (tlogId) -> TastySettings.api_host + 'v1/relationships/to/'+tlogId
  # follow, ignore, unfollow, cancel
  change_my_relationship_url:     (tlogId,state) ->
    TastySettings.api_host + 'v1/relationships/to/'+tlogId+'/' + state

window.Routes.api = ApiRoutes