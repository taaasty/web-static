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

request = (_method, url, data = {}, callbacks = {}) ->
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
    _.extend data, {_method}

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
    xhr: ->
      myXhr = $.ajaxSettings.xhr()

      if myXhr.upload and callbacks.onProgress?
        myXhr.upload.addEventListener 'progress', (e) ->
          if e.lengthComputable
            percentUploaded = Math.floor e.loaded * 100 / e.total
            callbacks.onProgress percentUploaded
        , false

      myXhr

getRequest = (url, data, callbacks) -> request 'GET', url, data, callbacks
postRequest = (url, data, callbacks) -> request 'POST', url, data, callbacks
putRequest = (url, data, callbacks) -> request 'PUT', url, data, callbacks
deleteRequest = (url, data, callbacks) -> request 'DELETE', url, data, callbacks

Api =
  search:
    loadNextPage: ({q, url, page, style}) ->
      key  = Constants.api.SEARCH_LOAD_NEXT_PAGE
      data = {q, page, style}

      abortPendingRequests key
      _pendingRequests[key] = getRequest url, data

  editor:
    createImageAttachment: (formData, callbacks) ->
      url = ApiRoutes.imageAttachments()
      key = Constants.api.EDITOR_CREATE_IMAGE_ATTACHMENT

      _pendingRequests[key] = postRequest url, formData, callbacks

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