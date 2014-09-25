CHANGE_EVENT = 'change'

_conversations = []

window.ConversationsStore = _.extend {}, EventEmitter.prototype, {

  emitChange: ->
    @emit CHANGE_EVENT

  addChangeListener: (callback) ->
    @on CHANGE_EVENT, callback

  removeChangeListener: (callback) ->
    @off CHANGE_EVENT, callback

  addConversation: (newConversation) ->
    unless @getConversation newConversation.id
      _conversations.unshift newConversation

  getActiveConversations: -> _conversations

  updateConversations: (activeConversations) ->
    _conversations = activeConversations

  updateConversation: (newConversation) ->
    for conversation, i in _conversations
      if conversation.id == newConversation.id
        index = i
        break

    if index?
      _conversations[index] = newConversation 
    else
      @addConversation newConversation

  getConversation: (conversationId) ->
    _.findWhere _conversations, { id: conversationId }

}

ConversationsStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'postNewConversation'
      ConversationsStore.addConversation action.conversation
      ConversationsStore.emitChange()
      break
    when 'newConversationReceived'
      ConversationsStore.addConversation action.conversation
      ConversationsStore.emitChange()
      break
    when 'updateActiveConversations'
      ConversationsStore.updateConversations action.activeConversations
      ConversationsStore.emitChange()
      break
    when 'updateConversation'
      ConversationsStore.updateConversation action.conversation
      ConversationsStore.emitChange()
      break