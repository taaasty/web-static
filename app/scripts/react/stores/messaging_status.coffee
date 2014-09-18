CHANGE_EVENT = 'change'

_totalUnreadConversationsCount = null

window.MessagingStatusStore = _.extend {}, EventEmitter.prototype, {

  emitChange: ->
    @emit CHANGE_EVENT

  addChangeListener: (callback) ->
    @on CHANGE_EVENT, callback

  removedChangeListener: (callback) ->
    @off CHANGE_EVENT, callback

  getTotalUnreadConversationsCount: ->
    _totalUnreadConversationsCount

  _updateTotalUnreadConversationsCount: (value) ->
    _totalUnreadConversationsCount = value
}

MessagingStatusStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'totalUnreadConversationUpdate'
      MessagingStatusStore._updateTotalUnreadConversationsCount action.count
      MessagingStatusStore.emitChange()
      break