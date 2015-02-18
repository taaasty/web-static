Constants     = require '../../constants/constants'
AppDispatcher = require '../../dispatcher/dispatcher'

NotificationsServerActions =

  load: (notifications, totalCount) ->
    AppDispatcher.handleServerAction
      type: Constants.notifications.LOAD
      notifications: notifications
      totalCount: totalCount

  read: (notification) ->
    AppDispatcher.handleServerAction
      type: Constants.notifications.READ
      notification: notification

  readAll: (notifications) ->
    AppDispatcher.handleServerAction
      type: Constants.notifications.READ_ALL
      notifications: notifications

module.exports = NotificationsServerActions