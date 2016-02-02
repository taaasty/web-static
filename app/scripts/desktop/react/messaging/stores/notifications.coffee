BaseStore = require '../../stores/BaseStore';
MessagingDispatcher = require '../MessagingDispatcher';

_notifications = []

window.NotificationsStore = _.extend new BaseStore(), {

  getNotifications: -> _notifications

  unshiftNotifications: (notifications) ->
    clonedNotifications = _notifications.slice(0)

    for notification in notifications
      unless @isNotificationExists notification
        clonedNotifications.unshift notification

    _notifications = clonedNotifications

  pushNotifications: (notifications) ->
    unless _.isArray notifications
      return console.error('Error in pushNotifications method. Argument should be array')

    clonedNotifications = _notifications.slice(0)

    for notification in notifications
      unless @isNotificationExists notification
        clonedNotifications.push notification

    _notifications = clonedNotifications

  updateNotification: (data) ->
    for notification in _notifications when notification.id == data.id
      _.extend notification, data
      break

  sortByDesc: ->
    clonedNotifications = _notifications.slice(0)

    clonedNotifications.sort (a, b) -> b.id - a.id

    _notifications = clonedNotifications

  isNotificationExists: (notification) ->
    return true for ntf in _notifications when ntf.id == notification.id

    false

}

NotificationsStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'notificationsLoaded'
      NotificationsStore.pushNotifications action.notifications
      # NotificationsStore.sortByAsc(action.conversationId)
      NotificationsStore.emitChange()
      break
    when 'notificationsUpdated'
      for notification in action.notifications
        NotificationsStore.updateNotification notification

      NotificationsStore.emitChange()
      break
    when 'notificationReceived'
      NotificationsStore.unshiftNotifications [action.notification]
      NotificationsStore.sortByDesc()
      NotificationsStore.emitChange()
      break
