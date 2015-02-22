_             = require 'lodash'
assign        = require 'react/lib/Object.assign'
BaseStore     = require './_base'
Constants     = require '../constants/constants'
AppDispatcher = require '../dispatcher/dispatcher'

_messagingStatus =
  activeConversationsCount: 0
  unreadConversationsCount: 0
  unreadNotificationsCount: 0

MessagingStatusStore = assign new BaseStore(),

  getUnreadConversationsCount: -> _messagingStatus.unreadConversationsCount
  getActiveConversationsCount: -> _messagingStatus.activeConversationsCount
  getUnreadNotificationsCount: -> _messagingStatus.unreadNotificationsCount

module.exports = MessagingStatusStore

MessagingStatusStore.dispatchToken = AppDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when Constants.messaging.UPDATE_STATUS
      _messagingStatus = action.status
      MessagingStatusStore.emitChange()