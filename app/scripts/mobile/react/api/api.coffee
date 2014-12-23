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

post = ({url, data}) ->
  reqwest
    url: url
    method: 'POST'
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
      _pendingRequests[key] = post {url}

    unfollow: (userId) ->
      url = ApiRoutes.change_my_relationship_url userId, 'unfollow'
      key = Constants.api.UNFOLLOW_USER

      abortPendingRequests key
      _pendingRequests[key] = post {url}

    cancel: (userId) ->
      url = ApiRoutes.change_my_relationship_url userId, 'cancel'
      key = Constants.api.CANCEL_USER

      abortPendingRequests key
      _pendingRequests[key] = post {url}

    ignore: (userId) ->
      url = ApiRoutes.change_my_relationship_url userId, 'ignore'
      key = Constants.api.IGNORE_USER

      abortPendingRequests key
      _pendingRequests[key] = post {url}

    report: (userId) ->
      url = ApiRoutes.tlog_report userId
      key = Constants.api.REPORT_USER

      abortPendingRequests key
      _pendingRequests[key] = post {url} 

module.exports = Api