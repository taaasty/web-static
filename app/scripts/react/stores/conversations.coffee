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
    # TODO Проверять что такого беседы еще нет
    _conversations.unshift newConversation

  getActiveConversations: -> _conversations

  updateConversations: (activeConversations) ->
    _conversations = activeConversations

  getConversation: (conversationId) ->
    for conversation in _conversations
      return conversation if conversation.id == conversationId
  
  getMessagesOfConversation: (conversationId) ->
    conversation = @getConversation conversationId
    conversation.last_messages

  getMessageInfo: (conversationId, messageId) ->
    conversation = @getConversation conversationId
    messages     = conversation.last_messages
    currentUser  = CurrentUserStore.getUser()
    recipient    = conversation.recipient

    for message in messages
      if message.id == messageId
        if recipient.id == message.recipient_id
          messageInfo = { type: 'outgoing', user: currentUser }
        else
          messageInfo = { type: 'incoming', user: recipient }
        break
    console.log messageInfo
    messageInfo

  getRecipientData: (conversationId, recipientId) ->
    conversation = @getConversation conversationId

    if conversation.recipient.id == recipientId
      return

  getUserData: (conversationId, userId) ->

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
