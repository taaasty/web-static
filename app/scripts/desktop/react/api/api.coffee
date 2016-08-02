_ = require 'lodash'
Constants = require '../constants/constants'
CurrentUserStore = require '../stores/current_user'

# TIMEOUT = 50000
_pendingRequests = {}

prepareData = (sourceData) ->
  data = {}

  Object.keys(sourceData).forEach (key, idx) ->
    data[key] = sourceData[key] if sourceData[key]?

  return data

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
    data.append('_method', _method)
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
    load: (url, sincePosition, limit) ->
      key = Constants.api.LOAD_RELATIONSHIPS
      data = prepareData({
        limit: limit
        since_position: sincePosition
      })

      _pendingRequests[key] = getRequest url, data

  user:
    predict: (query, limit) ->
      url = ApiRoutes.users_predict()
      key = Constants.api.PREDICT_USERS
      data = {query, limit}

      abortPendingRequests key
      _pendingRequests[key] = getRequest url, data

  sendSupportRequest: (email, text) ->
    url = ApiRoutes.supportRequest()
    key = Constants.api.SUPPORT_REQUEST
    data = {
      email,
      text
    }

    abortPendingRequests(key)
    _pendingRequests[key] = postRequest(url, data)

module.exports = Api
