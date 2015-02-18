ApiRoutes =
  omniauth_url:    (provider) -> TastySettings.host + '/auth/' + provider
  iframely_url:               -> TastySettings.api_host + '/v1/embeding/iframely.json'
  pusher_auth_url:            -> TastySettings.api_host + '/v1/messenger/auth'

  calendar_url:               (tlogId) -> TastySettings.api_host + '/v1/tlog/' + tlogId + '/calendar'
  votes_url:                 (entryId) -> TastySettings.api_host + '/v1/entries/' + entryId + '/votes'
  embed_url:                           -> TastySettings.api_host + '/v1/embed'
  design_settings_url:          (slug) -> TastySettings.api_host + '/v1/design_settings/' + slug
  design_settings_cover_url:    (slug) -> TastySettings.api_host + '/v1/design_settings/' + slug + '/cover'
  signin_url:                          -> TastySettings.api_host + '/v1/sessions'

  # Users
  signup_url:          -> TastySettings.api_host + '/v1/users'
  update_profile_url:  -> TastySettings.api_host + '/v1/users' # method put
  recovery_url:        -> TastySettings.api_host + '/v1/users/password/recovery'
  request_confirm_url: -> TastySettings.api_host + '/v1/users/confirmation'
  userpic_url:         -> TastySettings.api_host + '/v1/users/userpic'
  users_predict:       -> TastySettings.api_host + '/v1/users/predict'

  create_entry_url:                (type) -> TastySettings.api_host + '/v1/entries/' + type
  update_entry_url:  (entryId, entryType) -> TastySettings.api_host + '/v1/entries/' + entryType + '/' + entryId
  update_images_url:            (entryId) -> TastySettings.api_host + '/v1/entries/image/' +entryId+ '/images'

  entry_url:     (entryId) -> TastySettings.api_host + '/v1/entries/' + entryId
  favorites_url:           -> TastySettings.api_host + '/v1/favorites'
  watching_url:            -> TastySettings.api_host + '/v1/watching'
  report_url:    (entryId) -> TastySettings.api_host + '/v1/entries/' + entryId + '/report'

  # Relationships
  relationships_summary_url:                     -> TastySettings.api_host + '/v1/relationships/summary'
  relationships_to_url:                  (state) -> TastySettings.api_host + '/v1/relationships/to/' + state
  relationships_by_url:                  (state) -> TastySettings.api_host + '/v1/relationships/by/' + state
  relationships_by_id_url:              (tlogId) -> TastySettings.api_host + '/v1/relationships/by/' + tlogId
  unfollow_from_yourself_url:           (tlogId) -> TastySettings.api_host + '/v1/relationships/by/tlog/' + tlogId
  relationships_by_tlog_approve_url:    (tlogId) -> TastySettings.api_host + '/v1/relationships/by/tlog/' + tlogId + '/approve'
  relationships_by_tlog_disapprove_url: (tlogId) -> TastySettings.api_host + '/v1/relationships/by/tlog/' + tlogId + '/disapprove'

  tlog_followers:                       (tlogId) -> TastySettings.api_host + '/v1/tlog/' + tlogId + '/followers'
  tlog_followings:                      (tlogId) -> TastySettings.api_host + '/v1/tlog/' + tlogId + '/followings'
  tlog_tags:                            (tlogId) -> TastySettings.api_host + '/v1/tlog/' + tlogId + '/tags'
  tlog_report:                          (tlogId) -> TastySettings.api_host + '/v1/tlog/' + tlogId + '/report'
  get_my_relationship_url:              (tlogId) -> TastySettings.api_host + '/v1/relationships/to/tlog/' + tlogId

  # Comments
  comments_url:             (entryId) -> TastySettings.api_host + '/v1/comments'
  comments_edit_delete_url: (commentId) -> TastySettings.api_host + '/v1/comments/' + commentId
  comments_report_url:      (commentId) -> TastySettings.api_host + '/v1/comments/' + commentId + '/report'

  # follow, ignore, unfollow, cancel
  change_my_relationship_url: (tlogId, state) ->
    TastySettings.api_host + '/v1/relationships/to/tlog/' + tlogId + '/' + state

  # Messenger
  messenger_ready_url:                             -> TastySettings.api_host + '/v1/messenger/ready'
  messenger_new_conversation_url:           (slug) -> TastySettings.api_host + '/v1/messenger/conversations/by_slug/' + slug
  messenger_new_message_url:      (conversationId) -> TastySettings.api_host + '/v1/messenger/conversations/by_id/' + conversationId + '/messages'
  messenger_load_messages_url:    (conversationId) -> TastySettings.api_host + '/v1/messenger/conversations/by_id/' + conversationId + '/messages'
  messenger_read_messages_url:    (conversationId) -> TastySettings.api_host + '/v1/messenger/conversations/by_id/' + conversationId + '/messages/read'

  # Notifications
  notificationsUrl:             -> TastySettings.api_host + '/v1/messenger/notifications'
  notificationsReadAllUrl:      -> TastySettings.api_host + '/v1/messenger/notifications/read'
  notifications_read_url:  (id) -> TastySettings.api_host + '/v1/messenger/notifications/' + id + '/read'

  suggestions_vkontakte: -> TastySettings.api_host + '/v1/relationships/suggestions/vkontakte'
  suggestions_facebook:  -> TastySettings.api_host + '/v1/relationships/suggestions/facebook'

  feedLive:    -> TastySettings.api_host + '/v1/feeds/live'
  feedBest:    -> TastySettings.api_host + '/v1/feeds/best'
  feedFriends: -> TastySettings.api_host + '/v1/my_feeds/friends'

module.exports = ApiRoutes