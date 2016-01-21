BaseStore = require '../../stores/BaseStore';
MessagingDispatcher = require '../MessagingDispatcher';
ConversationsStore = require './ConversationsStore';

CONVERSATIONS_STATE           = 'conversations'
CREATE_NEW_CONVERSATION_STATE = 'createNewConversation'
THREAD_STATE                  = 'thread'

currentState   = CONVERSATIONS_STATE
conversationId = null

window.MessagesPopupStateStore = _.extend(new BaseStore(), {

  getCurrentState:               -> currentState
  getCurrentConversationId:      -> conversationId
  setCurrentConversationId:      (id) -> conversationId = id
  setThreadState:                -> currentState = THREAD_STATE
  setCreateNewConversationState: -> currentState = CREATE_NEW_CONVERSATION_STATE
  setConversationsState:         -> currentState = CONVERSATIONS_STATE

})

MessagesPopupStateStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'postNewConversation'
      MessagingDispatcher.waitFor [ConversationsStore.dispatchToken]
      MessagesPopupStateStore.setCurrentConversationId action.conversation.id
      MessagesPopupStateStore.setThreadState()
      MessagesPopupStateStore.emitChange()
      break
    when 'clickNewConversation'
      MessagesPopupStateStore.setCreateNewConversationState()
      MessagesPopupStateStore.emitChange()
      break
    when 'clickBackButton'
      MessagesPopupStateStore.setConversationsState()
      MessagesPopupStateStore.emitChange()
      break
    when 'openConversation'
      MessagesPopupStateStore.setCurrentConversationId action.conversationId
      MessagesPopupStateStore.setThreadState()
      MessagesPopupStateStore.emitChange()
      break
    when 'closeMessagesPopup'
      MessagesPopupStateStore.setConversationsState()
      MessagesPopupStateStore.emitChange()
      break
