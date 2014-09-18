CHANGE_EVENT = 'change'
CONNECTED_EVENT = 'connected'
ERROR_EVENT = 'connectionError'

_messagingStatus = {}

_totalUnreadConversationsCount = null

window.MessagingStatusStore = _.extend {}, EventEmitter.prototype, {

  emitChange:            -> @emit CHANGE_EVENT
  addChangeListener:     (callback) -> @on   CHANGE_EVENT, callback
  removedChangeListener: (callback) -> @off  CHANGE_EVENT, callback

  addConnectSuccessCallback: (callback) -> @on CONNECTED_EVENT, callback
  emitConnectSuccess:        -> @emit CONNECTED_EVENT

  addConnectErrorCallback:   (callback) -> @on ERROR_EVENT, callback
  emitConnectError:          -> @emit ERROR_EVENT

  getTotalUnreadConversationsCount: -> _messagingStatus.totalUnreadConversationsCount

  _update:        (messagingStatus) -> _messagingStatus = messagingStatus

}

MessagingStatusStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'updateMessagingStatus'
      MessagingStatusStore._update action.messagingStatus
      MessagingStatusStore.emitChange()
    when 'connected'
      MessagingStatusStore.emitConnectSuccess()
    when 'connectionError'
      MessagingStatusStore.emitConnectError()
    else
      console.error? "Unknown action type: #{action.type}", action

