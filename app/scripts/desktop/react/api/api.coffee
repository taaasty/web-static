_ = require 'lodash'
Constants = require '../constants/constants'
CurrentUserStore = require '../stores/current_user'

TIMEOUT = 10000
_pendingRequests = {}

abortPendingRequests = (key) ->
  if _pendingRequests[key]
    _pendingRequests[key].abort()
    _pendingRequests[key] = null

userToken = ->
  CurrentUserStore.getAccessToken()

request = (_method, url, data = {}) ->
  headers =
    'X-Requested-With': 'XMLHttpRequest'
    'X-Tasty-Client-Name': 'web_desktop'
    'X-Tasty-Client-Version': TastySettings.version

  headers['X-User-Token'] = userToken() if userToken()

  method = switch _method
    when 'GET'                   then 'GET'
    when 'POST', 'PUT', 'DELETE' then 'POST'
    else 'GET'

  if data instanceof FormData
    dataType    = 'multipart/form-data'
    processData = false
  else
    dataType    = 'json'
    processData = true
    _.extend data, {_method}

  $.ajax
    url: url
    method: method
    data: data
    headers: headers
    timeout: TIMEOUT
    xhrFields:
      withCredentials: true
      crossDomain:     true

getRequest =    (url, data) -> request 'GET', url, data
postRequest =   (url, data) -> request 'POST', url, data
putRequest =    (url, data) -> request 'PUT', url, data
deleteRequest = (url, data) -> request 'DELETE', url, data

Api =
  search:
    loadNextPage: (url, q, page) ->
      key  = Constants.api.SEARCH_LOAD_NEXT_PAGE
      data = {q, page}

      abortPendingRequests key
      _pendingRequests[key] = getRequest url, data

module.exports = Api