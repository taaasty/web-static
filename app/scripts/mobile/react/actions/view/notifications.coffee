Api                        = require '../../api/api'
NotifyController           = require '../../controllers/notify'
NotificationsServerActions = require '../server/notifications'

NotificationsViewActions =

  loadMore: (sinceId, limit) ->
    Api.notifications.load sinceId, limit
      .then (response) =>
        { notifications, total_count } = response
        NotificationsServerActions.load notifications, total_count
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  read: (id) ->
    Api.notifications.read id
      .then (notification) ->
        NotificationsServerActions.read notification
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  readAll: ->
    Api.notifications.readAll()
      .then (notifications) =>
        NotifyController.notifySuccess i18n.t('messages.notifications_mark_all_as_read_success')
        NotificationsServerActions.readAll notifications
      .fail (xhr) ->
        NotifyController.errorResponse xhr

module.exports = NotificationsViewActions