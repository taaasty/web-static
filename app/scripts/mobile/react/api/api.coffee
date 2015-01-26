assign           = require 'react/lib/Object.assign'
Constants        = require '../constants/constants'
CurrentUserStore = require '../stores/currentUser'

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
    'X-Tasty-Client-Name': 'web_mobile'
    'X-Tasty-Client-Version': TastySettings.version

  headers['X-User-Token'] = userToken() if userToken()

  method = switch _method
    when 'GET'                   then 'GET'
    when 'POST', 'PUT', 'DELETE' then 'POST'
    else 'GET'

  assign data, { _method }

  reqwest
    url: url
    method: method
    data: data
    timeout: TIMEOUT
    headers: headers

getRequest =    (url, data) -> request 'GET', url, data
postRequest =   (url, data) -> request 'POST', url, data
putRequest =    (url, data) -> request 'PUT', url, data
deleteRequest = (url, data) -> request 'DELETE', url, data

Api =

  locales:
    load: (locale) ->
      url = TastySettings.localesPath + '/' + locale + '.json'
      getRequest url

  relationship:
    follow: (userId) ->
      url = ApiRoutes.change_my_relationship_url userId, 'follow'
      key = Constants.api.FOLLOW_USER

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

    unfollow: (userId) ->
      url = ApiRoutes.change_my_relationship_url userId, 'unfollow'
      key = Constants.api.UNFOLLOW_USER

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

    cancel: (userId) ->
      url = ApiRoutes.change_my_relationship_url userId, 'cancel'
      key = Constants.api.CANCEL_USER

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

    ignore: (userId) ->
      url = ApiRoutes.change_my_relationship_url userId, 'ignore'
      key = Constants.api.IGNORE_USER

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

    report: (userId) ->
      url = ApiRoutes.tlog_report userId
      key = Constants.api.REPORT_USER

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

  entry:
    addToFavorites: (entryId) ->
      url  = ApiRoutes.favorites_url()
      key  = Constants.api.ADD_TO_FAVORITES
      data = entry_id: entryId

      abortPendingRequests key
      _pendingRequests[key] = postRequest url, data

    removeFromFavorites: (entryId) ->
      url  = ApiRoutes.favorites_url()
      key  = Constants.api.REMOVE_FROM_FAVORITES
      data = entry_id: entryId

      abortPendingRequests key
      _pendingRequests[key] = deleteRequest url, data

    startWatch: (entryId) ->
      url  = ApiRoutes.watching_url()
      key  = Constants.api.START_WATCH
      data = entry_id: entryId

      abortPendingRequests key
      _pendingRequests[key] = postRequest url, data

    stopWatch: (entryId) ->
      url  = ApiRoutes.watching_url()
      key  = Constants.api.STOP_WATCH
      data = entry_id: entryId

      abortPendingRequests key
      _pendingRequests[key] = deleteRequest url, data

    report: (entryId) ->
      url = ApiRoutes.report_url entryId
      key = Constants.api.REPORT

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

    delete: (entryId) ->
      url  = ApiRoutes.entry_url entryId
      key  = Constants.api.DELETE

      abortPendingRequests key
      _pendingRequests[key] = deleteRequest url

    vote: (entryId) ->
      url = ApiRoutes.votes_url entryId
      key = Constants.api.VOTE

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

    loadComments: (entryId, toCommentId, limit) ->
      url  = ApiRoutes.comments_url()
      key  = Constants.api.LOAD_COMMENTS
      data =
        entry_id:      entryId
        to_comment_id: toCommentId
        limit:         limit

      abortPendingRequests key
      _pendingRequests[key] = getRequest url, data

    deleteComment: (commentId) ->
      url = ApiRoutes.comments_edit_delete_url commentId
      key = Constants.api.DELETE_COMMENT

      abortPendingRequests key
      _pendingRequests[key] = deleteRequest url

    reportComment: (commentId) ->
      url = ApiRoutes.comments_report_url commentId
      key = Constants.api.REPORT_COMMENT

      abortPendingRequests key
      _pendingRequests[key] = postRequest url

    createComment: (entryId, text) ->
      url  = ApiRoutes.comments_url()
      key  = Constants.api.CREATE_COMMENT
      data =
        entry_id: entryId
        text:     text

      abortPendingRequests key
      _pendingRequests[key] = postRequest url, data

    editComment: (commentId, text) ->
      url  = ApiRoutes.comments_edit_delete_url commentId
      key  = Constants.api.EDIT_COMMENT
      data = {text}

      abortPendingRequests key
      _pendingRequests[key] = putRequest url, data

  feed:
    loadLiveEntries: (sinceEntryId, limit) ->
      url  = ApiRoutes.feedLive()
      key  = Constants.api.LOAD_FEED_ENTRIES
      data =
        since_entry_id:        sinceEntryId
        limit:                 limit
        include_comments_info: 1

      abortPendingRequests key
      _pendingRequests[key] = getRequest url, data

    loadBestEntries: (sinceEntryId, limit) ->
      url  = ApiRoutes.feedBest()
      key  = Constants.api.LOAD_FEED_ENTRIES
      data =
        since_entry_id:        sinceEntryId
        limit:                 limit
        include_comments_info: 1

      abortPendingRequests key
      _pendingRequests[key] = getRequest url, data

    loadFriendsEntries: (sinceEntryId, limit) ->
      url  = ApiRoutes.feedFriends()
      key  = Constants.api.LOAD_FEED_ENTRIES
      data =
        since_entry_id:        sinceEntryId
        limit:                 limit
        include_comments_info: 1

      abortPendingRequests key
      _pendingRequests[key] = getRequest url, data

  sessions:
    signIn: (login, password) ->
      url  = ApiRoutes.signin_url()
      key  = Constants.api.SIGN_IN
      data =
        email:    login
        password: password

      abortPendingRequests key
      _pendingRequests[key] = postRequest url, data

    signUp: (email, password, nickname) ->
      url  = ApiRoutes.signup_url()
      key  = Constants.api.SIGN_UP
      data =
        email:    email
        password: password
        slug:     nickname

      abortPendingRequests key
      _pendingRequests[key] = postRequest url, data

    recover: (login) ->
      url  = ApiRoutes.recovery_url()
      key  = Constants.api.RECOVER
      data = slug_or_email: login

      abortPendingRequests key
      _pendingRequests[key] = postRequest url, data

module.exports = Api