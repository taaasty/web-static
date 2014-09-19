CHANGE_EVENT = 'change'
CONVERSATIONS_STATE           = 'conversations'
CREATE_NEW_CONVERSATION_STATE = 'createNewConversation'
THREAD_STATE                  = 'thread'

currentState   = CONVERSATIONS_STATE
conversationId = null

window.MessagesPopupStateStore = _.extend {}, EventEmitter.prototype, {

  emitChange:               -> @emit CHANGE_EVENT
  addChangeListener:        (callback) -> @on  CHANGE_EVENT, callback
  removeChangeListener:     (callback) -> @off CHANGE_EVENT, callback
  getCurrentState:          -> currentState
  getCurrentConversationId: -> conversationId
  setCurrentConversationId: (id) -> conversationId = id
  setThreadState:           -> currentState = CREATE_NEW_CONVERSATION_STATE
  setConversationsState:    -> currentState = CONVERSATIONS_STATE

}

MessagesPopupStateStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'clickNewConversation'
      MessagesPopupStateStore.setThreadState()
      MessagesPopupStateStore.emitChange()
      break
    when 'clickBackButton'
      MessagesPopupStateStore.setConversationsState()
      MessagesPopupStateStore.emitChange()
      break
    when 'newConversationReceived'
      # MessagingDispatcher.waitFor [ConversationsStore.dispatchToken]
      MessagesPopupStateStore.setCurrentConversationId action.conversation.id
      MessagesPopupStateStore.setThreadState()
      MessagesPopupStateStore.emitChange()
      break