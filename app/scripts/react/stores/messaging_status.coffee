CHANGE_EVENT = 'change'

_messagingStatus = {}

window.MessagingStatusStore = _.extend {}, EventEmitter.prototype, {

  emitChange: ->
    @emit CHANGE_EVENT

  addChangeListener: (callback) ->
    @on CHANGE_EVENT, callback

  removeChangeListener: (callback) ->
    @off CHANGE_EVENT, callback

  getUnreadConversationsCount: -> _messagingStatus.unreadConversationsCount
  getActiveConversationsCount: -> _messagingStatus.anreadConversationsCount

  _update: (messagingStatus) -> _messagingStatus = messagingStatus

}

MessagingStatusStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'updateMessagingStatus'
      MessagingStatusStore._update action.messagingStatus
      MessagingStatusStore.emitChange()
      break