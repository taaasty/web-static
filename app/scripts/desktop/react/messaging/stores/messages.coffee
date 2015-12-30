{ PUBLIC_CONVERSATION } = require '../constants/ConversationConstants';
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
        if message.read_at && !data.read_at #FIXME temporal fix for race condition
          delete data.read_at
        _.extend message, data
        break

  getMessages: (conversationId) -> _messages[conversationId] ? []

  getMessageInfo: (message, conversationId) ->
    conversation = ConversationsStore.getConversation conversationId
    currentUser  = CurrentUserStore.getUser()
    if conversation.type == PUBLIC_CONVERSATION
      msgAuthor = conversation.users.filter((u) -> u.id == message.user_id)[0]
      messageInfo = {
        type: if message.user_id == currentUser.id then 'outgoing' else 'incoming'
        user: msgAuthor
      }
    else
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

  sortByAsc: (conversationId) ->
    clonedMessages = _messages[conversationId].slice(0)
    clonedMessages.sort (a, b) -> a.id - b.id

    _messages[conversationId] = clonedMessages

}

MessagesStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'messagesLoaded'
      MessagesStore.pushMessages action.conversationId, action.messages
      MessagesStore.sortByAsc(action.conversationId)
      MessagesStore.emitChange()
      break
    when 'moreMessagesLoaded'
      _allMessagesLoaded[action.conversationId] = action.allMessagesLoaded

      MessagesStore.unshiftMessages action.conversationId, action.messages
      MessagesStore.emitChange()
      break
    when 'messagesUpdated'
      for message in action.messages
        MessagesStore.updateMessage action.conversationId, message

      MessagesStore.emitChange()
      break
    when 'messageReceived'
      message = _.extend action.message, {
        sendingState: null
      }

      if MessagesStore.isMessageExists action.conversationId, message
        MessagesStore.updateMessage action.conversationId, message
      else
        MessagesStore.pushMessages action.conversationId, [message]
        MessagesStore.sortByAsc(action.conversationId)

      MessagesStore.emitChange()
      break
    when 'messageSubmitted'
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
