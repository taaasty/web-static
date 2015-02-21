_                        = require 'lodash'
NotificationsViewActions = require '../../../actions/view/notifications'

LOAD_MORE_LIMIT = 20
SHOW_STATE    = 'show'
LOADING_STATE = 'load'
ERROR_STATE   = 'error'

NotificationsMixin =

  getDefaultProps: ->
    limit: LOAD_MORE_LIMIT

  hasUnreadNotifications: ->
    unreadItems = _.filter @state.notifications, (item) ->
      item.read_at is null

    !!unreadItems.length

  isLoadingState: -> @state.currentState is LOADING_STATE

  activateShowState:    -> @safeUpdateState(currentState: SHOW_STATE)
  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
  activateErrorState:   -> @safeUpdateState(currentState: ERROR_STATE)

  markAsRead: (id) ->
    NotificationsViewActions.read id

  markAllAsRead: ->
    NotificationsViewActions.readAll()

  loadMore: ->
    sinceId = @state.notifications[@state.notifications.length - 1].id
    limit   = @props.limit

    @activateLoadingState()

    NotificationsViewActions.loadMore sinceId, limit
      .always @activateShowState

module.exports = NotificationsMixin