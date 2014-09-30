CHANGE_EVENT = 'change'

_messages = {}
_allMessagesLoaded = {}

window.MessagesStore = _.extend {}, EventEmitter.prototype, {

  emitChange: ->
    @emit CHANGE_EVENT

  addChangeListener: (callback) ->
    @on CHANGE_EVENT, callback

  removeChangeListener: (callback) ->
    @off CHANGE_EVENT, callback

  pushMessages: (conversationId, messages) ->
    _messages[conversationId] ||= []
    clonedMessages = _messages[conversationId].slice(0)

    for message in messages
      unless @isMessageExists conversationId, message
        clonedMessages.push message

    _messages[conversationId] = clonedMessages

  unshiftMessages: (conversationId, messages) ->
    loadedMessages = messages.reverse()
    clonedMessages = _messages[conversationId].slice(0)

    for loadedMessage in loadedMessages
      clonedMessages.unshift loadedMessage

    _messages[conversationId] = clonedMessages

  updateMessage: (conversationId, data) ->
    _messages[conversationId] ||= []
    messages = _messages[conversationId]

    for message in messages
      if message.uuid is data.uuid
        _.extend message, data
        break

  getMessages: (conversationId) -> _messages[conversationId] ? []

  getMessageInfo: (message, conversationId) ->
    conversation = ConversationsStore.getConversation conversationId
    currentUser  = CurrentUserStore.getUser()
    recipient    = conversation.recipient

    if recipient.id == message.recipient_id
      messageInfo = { type: 'outgoing', user: currentUser }
    else
      messageInfo = { type: 'incoming', user: recipient }

    messageInfo

  isMessageExists: (conversationId, message) ->
    _messages[conversationId] ||= []
    messages = _messages[conversationId]

    for msg in messages
      return true if msg.uuid is message.uuid

    false

  isAllMessagesLoaded: (conversationId) -> _allMessagesLoaded[conversationId]

}

MessagesStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'messagesLoaded'
      MessagesStore.pushMessages action.conversationId, action.messages
      MessagesStore.emitChange()
      break
    when 'moreMessagesLoaded'
      MessagesStore.unshiftMessages action.conversationId, action.messages
      _allMessagesLoaded[action.conversationId] = action.allMessagesLoaded

      MessagesStore.emitChange()
      break
    when 'messagesUpdated'
      for message in action.messages
        MessagesStore.updateMessage action.conversationId, message

      MessagesStore.emitChange()
      break
    when 'messageResubmitted'
      message = _.extend action.message, {
        sendingState: null
      }

      MessagesStore.updateMessage action.conversationId, message
      MessagesStore.emitChange()
      break
    when 'messageReceived'
      if MessagesStore.isMessageExists action.conversationId, action.message
        MessagesStore.updateMessage action.conversationId, action.message
      else
        MessagesStore.pushMessages action.conversationId, [action.message]

      MessagesStore.emitChange()
      break
    when 'messageSent'
      MessagesStore.pushMessages action.conversationId, [action.message]
      MessagesStore.emitChange()
      break
    when 'messageSendingError'
      MessagesStore.updateMessage action.conversationId, {
        uuid: action.uuid
        sendingState: 'error'
      }
      MessagesStore.emitChange()
      break