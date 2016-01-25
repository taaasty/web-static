MESSENGER_VERSION_PREFIX = 'v2'

ApiRoutes =
  omniauth_url:    (provider) -> gon.host + '/auth/' + provider
  iframely_url:               -> gon.api_host + '/v1/embeding/iframely.json'
  pusher_auth_url:            -> "#{gon.api_host}/#{MESSENGER_VERSION_PREFIX}/messenger/auth"

  calendar_url:               (tlogId) -> gon.api_host + '/v1/tlog/' + tlogId + '/calendar'
  votes_url:                 (entryId) -> gon.api_host + '/v1/entries/' + entryId + '/votes'
  reposts_url:                         -> gon.api_host + '/v1/reposts'
  embed_url:                           -> gon.api_host + '/v1/embed'
  design_settings_url:          (slug) -> gon.api_host + '/v1/design_settings/' + slug
  design_settings_cover_url:    (slug) -> gon.api_host + '/v1/design_settings/' + slug + '/cover'
  signin_url:                          -> gon.api_host + '/v1/sessions'

  onboarding_url:                      -> "#{gon.api_host}/v1/onboarding/users"

  # Users
  signup_url:          -> gon.api_host + '/v1/users'
  update_profile_url:  -> gon.api_host + '/v1/users' # method put
  recovery_url:        -> gon.api_host + '/v1/users/password/recovery'
  request_confirm_url: -> gon.api_host + '/v1/users/confirmation'
  userpic_url:         -> gon.api_host + '/v1/users/userpic'
  users_predict:       -> gon.api_host + '/v1/users/predict'

  fb_crosspost_url:    -> "#{gon.api_host}/v1/facebook/crossposting"
  twitter_crosspost_url:    -> "#{gon.api_host}/v1/twitter/crossposting"

  create_entry_url:                (type) -> gon.api_host + '/v1/entries/' + type
  update_entry_url:  (entryId, entryType) -> gon.api_host + '/v1/entries/' + entryType + '/' + entryId
  update_images_url:            (entryId) -> gon.api_host + '/v1/entries/image/' +entryId+ '/images'

  entry_url:     (entryId) -> gon.api_host + '/v1/entries/' + entryId
  favorites_url:           -> gon.api_host + '/v1/favorites'
  watching_url:            -> gon.api_host + '/v1/watching'
  report_url:    (entryId) -> gon.api_host + '/v1/entries/' + entryId + '/report'

  # Relationships
  relationships_summary_url:                     -> gon.api_host + '/v1/relationships/summary'
  relationships_to_url:                  (state) -> gon.api_host + '/v1/relationships/to/' + state
  relationships_by_url:                  (state) -> gon.api_host + '/v1/relationships/by/' + state
  relationships_by_id_url:              (tlogId) -> gon.api_host + '/v1/relationships/by/' + tlogId
  unfollow_from_yourself_url:           (tlogId) -> gon.api_host + '/v1/relationships/by/tlog/' + tlogId
  relationships_by_tlog_approve_url:    (tlogId) -> gon.api_host + '/v1/relationships/by/tlog/' + tlogId + '/approve'
  relationships_by_tlog_disapprove_url: (tlogId) -> gon.api_host + '/v1/relationships/by/tlog/' + tlogId + '/disapprove'

  # Tlog relationships
  tlogRelationshipsBy: (objectID, state) ->
    gon.api_host + '/v1/tlog_relationships/' + objectID + '/by/' + state

  tlogRelationshipsTo: (objectID, state) ->
    gon.api_host + '/v1/tlog_relationships/' + objectID + '/to/' + state

  tlogRelationshipsByApprove: (objectID, subjectID) ->
    gon.api_host + '/v1/tlog_relationships/' + objectID + '/by/tlog/' + subjectID + '/approve'

  tlogRelationshipsByDisapprove: (objectID, subjectID) ->
    gon.api_host + '/v1/tlog_relationships/' + objectID + '/by/tlog/' + subjectID + '/disapprove'

  tlogRelationshipsToTlog: (objectID, subjectID, state) ->
    gon.api_host + '/v1/tlog_relationships/' + objectID + '/to/tlog/' + subjectID + '/' + state

  tlogRelationshipsByTlog: (objectID, subjectID) ->
    gon.api_host + '/v1/tlog_relationships/' + objectID + '/by/tlog/' + subjectID

  tlogEntries:                          (tlogId) -> gon.api_host + '/v1/tlog/' + tlogId + '/entries'
  tlogEntriesTlogs:                     (tlogId) -> gon.api_host + '/v1/tlog/' + tlogId + '/entries/tlogs'
  tlogEntriesBricks:                    (tlogId) -> gon.api_host + '/v1/tlog/' + tlogId + '/enrties/bricks'

  tlog_followers:                       (tlogId) -> gon.api_host + '/v1/tlog/' + tlogId + '/followers'
  tlog_followings:                      (tlogId) -> gon.api_host + '/v1/tlog/' + tlogId + '/followings'
  tlog_tags:                            (tlogId) -> gon.api_host + '/v1/tlog/' + tlogId + '/tags'
  tlog_report:                          (tlogId) -> gon.api_host + '/v1/tlog/' + tlogId + '/report'
  get_my_relationship_url:              (tlogId) -> gon.api_host + '/v1/relationships/to/tlog/' + tlogId

  # Comments
  comments_url:             (entryId) -> gon.api_host + '/v1/comments'
  comments_edit_delete_url: (commentId) -> gon.api_host + '/v1/comments/' + commentId
  comments_report_url:      (commentId) -> gon.api_host + '/v1/comments/' + commentId + '/report'

  # follow, ignore, unfollow, cancel
  change_my_relationship_url: (tlogId, state) ->
    gon.api_host + '/v1/relationships/to/tlog/' + tlogId + '/' + state

  # Messenger
  messenger_ready_url: ->
    "#{gon.api_host}/#{MESSENGER_VERSION_PREFIX}/messenger/ready"
  messengerConversationById: (id) ->
    "#{gon.api_host}/#{MESSENGER_VERSION_PREFIX}/messenger/conversations/by_id/#{id}"
  messengerConversationsByUserId: (userId) ->
    "#{gon.api_host}/#{MESSENGER_VERSION_PREFIX}/messenger/conversations/by_user_id/#{userId}"
  messengerDeleteMessages: (id) ->
    "#{gon.api_host}/#{MESSENGER_VERSION_PREFIX}/messenger/conversations/by_id/#{id}/messages/delete_by_ids"
  messenger_new_message_url: (id) ->
    "#{gon.api_host}/#{MESSENGER_VERSION_PREFIX}/messenger/conversations/by_id/#{id}/messages"
  messenger_load_messages_url: (id) ->
    "#{gon.api_host}/#{MESSENGER_VERSION_PREFIX}/messenger/conversations/by_id/#{id}/messages"
  messenger_read_messages_url: (id) ->
    "#{gon.api_host}/#{MESSENGER_VERSION_PREFIX}/messenger/conversations/by_id/#{id}/messages/read"

  # Notifications
  notificationsUrl:             -> "#{gon.api_host}/#{MESSENGER_VERSION_PREFIX}/messenger/notifications"
  notificationsReadAllUrl:      -> "#{gon.api_host}/#{MESSENGER_VERSION_PREFIX}/messenger/notifications/read"
  notifications_read_url:  (id) -> "#{gon.api_host}/#{MESSENGER_VERSION_PREFIX}/messenger/notifications/#{id}/read"

  suggestions_vkontakte: -> gon.api_host + '/v1/relationships/suggestions/vkontakte'
  suggestions_facebook:  -> gon.api_host + '/v1/relationships/suggestions/facebook'

  feedLive:    -> gon.api_host + '/v1/feeds/live'
  feedBest:    -> gon.api_host + '/v1/feeds/best'
  feedFriends: -> gon.api_host + '/v1/my_feeds/friends'
  feedAnonymous: -> gon.api_host + '/v1/feeds/anonymous'

  imageAttachments: -> gon.api_host + '/v1/image_attachments'
  imageAttachmentsWithID: (attachmentID) -> gon.api_host + '/v1/image_attachments/' + attachmentID

  backgrounds: -> gon.api_host + '/v1/backgrounds'

  flows: -> gon.api_host + '/v1/flows'
  flowsMine: -> gon.api_host + '/v1/flows/my'
  flowsAvailable: -> gon.api_host + '/v1/flows/available'
  flow: (flowID) -> gon.api_host + '/v1/flows/' + flowID
  flowStaffs: (flowID) -> gon.api_host + '/v1/flows/' + flowID + '/staffs'

module.exports = ApiRoutes
