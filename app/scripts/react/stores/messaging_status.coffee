CHANGE_EVENT = 'change'
CONNECTED_EVENT = 'connected'
ERROR_EVENT = 'connectionError'

_messagingStatus = {}

window.MessagingStatusStore = _.extend {}, EventEmitter.prototype, {

  emitChange:            -> @emit CHANGE_EVENT
  addChangeListener:     (callback) -> @on   CHANGE_EVENT, callback
  removedChangeListener: (callback) -> @off  CHANGE_EVENT, callback

  addConnectSuccessCallback: (callback) -> @on CONNECTED_EVENT, callback
  emitConnectSuccess:        -> @emit CONNECTED_EVENT

  addConnectErrorCallback:   (callback) -> @on ERROR_EVENT, callback
  emitConnectError:          -> @emit ERROR_EVENT

  getUnreadConversationsCount: -> _messagingStatus.unreadConversationsCount
  getActiveConversationsCount: -> _messagingStatus.anreadConversationsCount

  _update:        (messagingStatus) -> _messagingStatus = messagingStatus

}

MessagingStatusStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'updateMessagingStatus'
      MessagingStatusStore._update action.messagingStatus
      MessagingStatusStore.emitChange()
      break
    when 'connected'
      MessagingStatusStore.emitConnectSuccess()
      break
    when 'connectionError'
      MessagingStatusStore.emitConnectError()
      break

