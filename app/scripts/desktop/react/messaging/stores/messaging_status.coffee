_         = require 'lodash'
BaseStore = require './_base'

_messagingStatus =
  activeConversationsCount: 0
  unreadConversationsCount: 0
  unreadNotificationsCount: 0

MessagingStatusStore = _.extend new BaseStore(),

  getUnreadConversationsCount: -> _messagingStatus.unreadConversationsCount
  getActiveConversationsCount: -> _messagingStatus.activeConversationsCount
  getUnreadNotificationsCount: -> _messagingStatus.unreadNotificationsCount

  _update: (messagingStatus) -> _messagingStatus = messagingStatus

module.exports = MessagingStatusStore

MessagingStatusStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'updateMessagingStatus'
      _messagingStatus = action.messagingStatus
      MessagingStatusStore.emitChange()