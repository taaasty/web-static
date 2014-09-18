CHANGE_EVENT = 'change'

_conversations = []

window.ConversationsStore = _.extend {}, EventEmitter.prototype, {

  emitChange: ->
    @emit CHANGE_EVENT

  addChangeListener: (callback) ->
    @on CHANGE_EVENT, callback

  removedChangeListener: (callback) ->
    @off CHANGE_EVENT, callback

  addConversation: (newConversation) ->
    _conversations.unshift newConversation

  getAllConversations: -> _conversations

}

ConversationsStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'newConversationReceived'
      ConversationsStore.addConversation action.conversation
      ConversationsStore.emitChange()
      break