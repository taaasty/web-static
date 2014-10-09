CHANGE_EVENT = 'change'

_notifications = []

window.NotificationsStore = _.extend {}, EventEmitter.prototype, {

  emitChange: ->
    @emit CHANGE_EVENT

  addChangeListener: (callback) ->
    @on CHANGE_EVENT, callback

  removeChangeListener: (callback) ->
    @off CHANGE_EVENT, callback

  getNotifications: -> _notifications

  pushNotifications: (notifications) ->
    unless _.isArray notifications
      return console.error('Error in pushNotifications method. Argument should be array')

    clonedNotifications = _notifications.slice(0)

    for notification in notifications
      unless @isNotificationExists notification
        clonedNotifications.push notification

    _notifications = clonedNotifications

  isNotificationExists: (notification) ->
    for ntf in _notifications
      return true if ntf.id is notification.id

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