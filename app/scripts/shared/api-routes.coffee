ApiRoutes =
  omniauth_url:                       (provider) -> TastySettings.host + 'auth/' + provider

  calendar_url:                         (tlogId) -> TastySettings.api_host + 'v1/tlog/' + tlogId + '/calendar'
  votes_url:                           (entryId) -> TastySettings.api_host + 'v1/entries/' + entryId + '/votes'
  embed_url:                                     -> TastySettings.api_host + 'v1/embed'
  design_settings_url:                    (slug) -> TastySettings.api_host + 'v1/design_settings/' + slug
  design_settings_cover_url:              (slug) -> TastySettings.api_host + 'v1/design_settings/' + slug + '/cover'
  signin_url:                                    -> TastySettings.api_host + 'v1/sessions'
  signup_url:                                    -> TastySettings.api_host + 'v1/users'
  update_profile_url:                            -> TastySettings.api_host + 'v1/users' # method put
  recovery_url:                                  -> TastySettings.api_host + 'v1/users/password/recovery'
  request_confirm_url:                           -> TastySettings.api_host + 'v1/users/confirmation'
  userpic_url:                                   -> TastySettings.api_host + 'v1/users/userpic'

  create_entry_url:                       (type) -> TastySettings.api_host + 'v1/entries/' + type
  update_entry_url:                      (entry) -> TastySettings.api_host + 'v1/entries/' + entry.type + '/' +entry.id

  entry_url:                           (entryId) -> TastySettings.api_host + 'v1/entries/' + entryId

  # Relationships
  relationships_summary_url:                     -> TastySettings.api_host + 'v1/relationships/summary'
  relationships_to_url:                  (state) -> TastySettings.api_host + 'v1/relationships/to/' + state
  relationships_by_url:                  (state) -> TastySettings.api_host + 'v1/relationships/by/' + state
  relationships_by_tlog_approve_url:    (tlogId) -> TastySettings.api_host + 'v1/relationships/by/tlog/' + tlogId + '/approve'
  relationships_by_tlog_disapprove_url: (tlogId) -> TastySettings.api_host + 'v1/relationships/by/tlog/' + tlogId + '/disapprove'
  get_my_relationship_url:              (tlogId) -> TastySettings.api_host + 'v1/relationships/to/tlog/'+tlogId
  # follow, ignore, unfollow, cancel
  change_my_relationship_url:    (tlogId, state) ->
    TastySettings.api_host + 'v1/relationships/to/tlog/' + tlogId + '/' + state

window.Routes.api = ApiRoutes
