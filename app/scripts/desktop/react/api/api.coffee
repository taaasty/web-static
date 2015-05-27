_ = require 'lodash'
Constants = require '../constants/constants'
CurrentUserStore = require '../stores/current_user'

# TIMEOUT = 50000
_pendingRequests = {}

abortPendingRequests = (key) ->
  if _pendingRequests[key]
    _pendingRequests[key].abort()
    _pendingRequests[key] = null

userToken = ->
  CurrentUserStore.getAccessToken()

csrfToken = ->
  tokenNode = document.querySelector '[name="csrf-token"]'

  if tokenNode? then tokenNode.getAttribute('content') else null

request = (_method, url, data = {}) ->
  headers =
    'X-Requested-With': 'XMLHttpRequest'
    'X-Tasty-Client-Name': 'web_desktop'
    'X-Tasty-Client-Version': gon.version

  headers['X-User-Token'] = userToken() if userToken()
  headers['X-CSRF-Token'] = csrfToken() if csrfToken()

  method = switch _method
    when 'GET'                   then 'GET'
    when 'POST', 'PUT', 'DELETE' then 'POST'
    else 'GET'

  if data instanceof FormData
    contentType = false
    processData = false
  else
    contentType = 'application/x-www-form-urlencoded'
    processData = true
    data = _.extend {}, data, {_method}

  $.ajax
    url: url
    method: method
    data: data
    contentType: contentType
    processData: processData
    headers: headers
    # timeout: TIMEOUT
    xhrFields:
      withCredentials: true
      crossDomain:     true

getRequest = (url, data) -> request 'GET', url, data
postRequest = (url, data) -> request 'POST', url, data
putRequest = (url, data) -> request 'PUT', url, data
deleteRequest = (url, data) -> request 'DELETE', url, data

Api =
  search:
    loadNextPage: (searchUrl) ->
      key = Constants.api.SEARCH_LOAD_NEXT_PAGE

      abortPendingRequests key
      _pendingRequests[key] = getRequest searchUrl

  design:
    saveCurrent: (design, userID) ->
      url  = ApiRoutes.design_settings_url userID
      key  = Constants.api.DESIGN_SAVE
      data = design

      abortPendingRequests key
      _pendingRequests[key] = putRequest url, data

    createBgImage: (formData) ->
      url = ApiRoutes.backgrounds()
      key = Constants.api.CREATE_BG_IMAGE

      abortPendingRequests key
      _pendingRequests[key] = postRequest url, formData

  editor:
    createImageAttachment: (formData) ->
      url = ApiRoutes.imageAttachments()
      key = Constants.api.EDITOR_CREATE_IMAGE_ATTACHMENT

      _pendingRequests[key] = postRequest url, formData

    deleteImageAttachment: (attachmentID) ->
      url = ApiRoutes.imageAttachmentsWithID attachmentID
      key = Constants.api.EDITOR_DELETE_IMAGE_ATTACHMENT

      _pendingRequests[key] = deleteRequest url

    createEmbed: (embedUrl) ->
      url  = ApiRoutes.iframely_url()
      key  = Constants.api.EDITOR_CREATE_EMBED
      data = url: embedUrl

      abortPendingRequests key
      _pendingRequests[key] = postRequest url, data

    createEntry: (url, data) ->
      key = Constants.api.EDITOR_CREATE_ENTRY

      abortPendingRequests key
      _pendingRequests[key] = postRequest url, data

    updateEntry: (url, data) ->
      key = Constants.api.EDITOR_UPDATE_ENTRY

      abortPendingRequests key
      _pendingRequests[key] = putRequest url, data

  notifications:
    load: (sinceID) ->
      url = ApiRoutes.notificationsUrl()
      key = Constants.api.LOAD_NOTIFICATIONS
      data =
        to_notification_id: sinceID

      abortPendingRequests key
      _pendingRequests[key] = getRequest url, data

    markAsRead: (notificationID) ->
      url = ApiRoutes.notifications_read_url(notificationID)
      key = Constants.api.READ_NOTIFICATION

      # 1 запрос = 1 прочитанному сообщению. При закрытии уведомлений может быть более
      # одного запроса на прочтение уведомления. Позволяем делать параллельные запросы.
      _pendingRequests[key] = putRequest url

  relationship:
    unfollow: (tlogID) ->
      url = ApiRoutes.change_my_relationship_url tlogID, 'unfollow'
      key = Constants.api.UNFOLLOW_TLOG

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

    follow: (tlogID) ->
      url = ApiRoutes.change_my_relationship_url tlogID, 'follow'
      key = Constants.api.FOLLOW_TLOG

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

    cancel: (tlogID) ->
      url = ApiRoutes.change_my_relationship_url tlogID, 'cancel'
      key = Constants.api.CANCEL_TLOG

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

  entry:
    vote: (entryID) ->
      url = ApiRoutes.votes_url entryID
      key = Constants.api.VOTE_ENTRY

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

    accept: (acceptUrl) ->
      key = Constants.api.ACCEPT_ENTRY

      abortPendingRequests key
      _pendingRequests[key] = putRequest acceptUrl

    decline: (declineUrl) ->
      key = Constants.api.DECLINE_ENTRY

      abortPendingRequests key
      _pendingRequests[key] = putRequest declineUrl

    load: (url, sinceEntryID, limit) ->
      key = Constants.api.LOAD_ENTRIES
      data = {}
      data.since_entry_id = sinceEntryID if sinceEntryID
      data.limit = limit if limit

      abortPendingRequests key
      _pendingRequests[key] = getRequest url, data

    loadHtml: (url) ->
      key = Constants.api.LOAD_HTML_ENTRIES

      abortPendingRequests key
      _pendingRequests[key] = getRequest url

module.exports = Api