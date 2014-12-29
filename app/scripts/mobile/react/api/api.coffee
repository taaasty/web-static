Constants        = require '../constants/constants'
CurrentUserStore = require '../stores/current_user'

TIMEOUT = 10000
_pendingRequests = {}

abortPendingRequests = (key) ->
  if _pendingRequests[key]
    _pendingRequests[key].abort()
    _pendingRequests[key] = null

userToken = ->
  CurrentUserStore.getAccessToken()

getRequest = ({url, data}) ->
  reqwest
    url: url
    method: 'GET'
    data: data
    timeout: TIMEOUT
    headers:
      'X-User-Token':     userToken()
      'X-Requested-With': 'XMLHttpRequest'

postRequest = ({url, data}) ->
  reqwest
    url: url
    method: 'POST'
    data: data
    timeout: TIMEOUT
    headers:
      'X-User-Token':     userToken()
      'X-Requested-With': 'XMLHttpRequest'

deleteRequest = ({url, data}) ->
  reqwest
    url: url
    method: 'DELETE'
    data: data
    timeout: TIMEOUT
    headers:
      'X-User-Token':     userToken()
      'X-Requested-With': 'XMLHttpRequest'

Api =

  relationship:
    follow: (userId) ->
      url = ApiRoutes.change_my_relationship_url userId, 'follow'
      key = Constants.api.FOLLOW_USER

      abortPendingRequests key
      _pendingRequests[key] = postRequest {url}

    unfollow: (userId) ->
      url = ApiRoutes.change_my_relationship_url userId, 'unfollow'
      key = Constants.api.UNFOLLOW_USER

      abortPendingRequests key
      _pendingRequests[key] = postRequest {url}

    cancel: (userId) ->
      url = ApiRoutes.change_my_relationship_url userId, 'cancel'
      key = Constants.api.CANCEL_USER

      abortPendingRequests key
      _pendingRequests[key] = postRequest {url}

    ignore: (userId) ->
      url = ApiRoutes.change_my_relationship_url userId, 'ignore'
      key = Constants.api.IGNORE_USER

      abortPendingRequests key
      _pendingRequests[key] = postRequest {url}

    report: (userId) ->
      url = ApiRoutes.tlog_report userId
      key = Constants.api.REPORT_USER

      abortPendingRequests key
      _pendingRequests[key] = postRequest {url}

  entry:
    addToFavorites: (entryId) ->
      url  = ApiRoutes.favorites_url()
      key  = Constants.api.ADD_TO_FAVORITES
      data = entry_id: entryId

      abortPendingRequests key
      _pendingRequests[key] = postRequest {url, data}

    removeFromFavorites: (entryId) ->
      url  = ApiRoutes.favorites_url()
      key  = Constants.api.REMOVE_FROM_FAVORITES
      data = entry_id: entryId

      abortPendingRequests key
      _pendingRequests[key] = deleteRequest {url, data}

    startWatch: (entryId) ->
      url  = ApiRoutes.watching_url()
      key  = Constants.api.START_WATCH
      data = entry_id: entryId

      abortPendingRequests key
      _pendingRequests[key] = postRequest {url, data}

    stopWatch: (entryId) ->
      url  = ApiRoutes.watching_url()
      key  = Constants.api.STOP_WATCH
      data = entry_id: entryId

      abortPendingRequests key
      _pendingRequests[key] = deleteRequest {url, data}

    report: (entryId) ->
      url = ApiRoutes.report_url entryId
      key = Constants.api.REPORT

      abortPendingRequests key
      _pendingRequests[key] = postRequest {url}

    delete: (entryId) ->
      url  = ApiRoutes.entry_url entryId
      key  = Constants.api.DELETE

      abortPendingRequests key
      _pendingRequests[key] = deleteRequest {url}

    vote: (entryId) ->
      url = ApiRoutes.votes_url entryId
      key = Constants.api.VOTE

      abortPendingRequests key
      _pendingRequests[key] = postRequest {url}

    loadComments: (entryId, toCommentId, limit) ->
      url = ApiRoutes.comments_url()
      key = Constants.api.LOAD_COMMENTS
      data =
        entry_id:      entryId
        to_comment_id: toCommentId
        limit:         limit

      abortPendingRequests key
      _pendingRequests[key] = getRequest {url, data}

module.exports = Api