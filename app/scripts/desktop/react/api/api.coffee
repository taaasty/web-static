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
    timeout: TIMEOUT
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

  feed:
    loadEntries: (feedUrl) ->
      key = Constants.api.FEED_LOAD_ENTRIES

      abortPendingRequests key
      _pendingRequests[key] = getRequest feedUrl

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

module.exports = Api