import BaseStore from '../../stores/BaseStore';
import MessagingDispatcher from '../MessagingDispatcher';
import ConversationsStore from './ConversationsStore';

export const CONVERSATIONS_STATE = 'conversations';
export const CREATE_NEW_CONVERSATION_STATE = 'createNewConversation';
export const THREAD_STATE = 'thread';

let currentState = CONVERSATIONS_STATE;
let selectState = false;
let conversationId = null;

const MessagesPopupStore = Object.assign(
  new BaseStore(),
  {
    getCurrentState() {
      return currentState;
    },

    getSelectState() {
      return selectState;
    },
    
    getCurrentConversationId() {
      return conversationId;
    },

    setCurrentConversationId(id) {
      conversationId = id;
    },

    setThreadState() {
      currentState = THREAD_STATE;
      selectState = false;
    },

    setCreateNewConversationState() {
      currentState = CREATE_NEW_CONVERSATION_STATE;
      selectState = false;
    },

    setConversationsState() {
      currentState = CONVERSATIONS_STATE;
      selectState = false;
    },

    startSelect() {
      selectState = currentState === THREAD_STATE; // set to true only if in thread state
    },

    stopSelect() {
      selectState = false;
    },
  }
);

MessagesPopupStore.dispatchToken = MessagingDispatcher.register(({ action }) => {
  switch (action.type) {
  case 'postNewConversation':
    MessagingDispatcher.waitFor([ ConversationsStore.dispatchToken ]);
    MessagesPopupStore.setCurrentConversationId(action.conversation.id);
    MessagesPopupStore.setThreadState();
    MessagesPopupStore.emitChange();
    break;
  case 'clickNewConversation':
    MessagesPopupStore.setCreateNewConversationState();
    MessagesPopupStore.emitChange();
    break;
  case 'clickBackButton':
    MessagesPopupStore.setConversationsState();
    MessagesPopupStore.emitChange();
    break;
  case 'openConversation':
    MessagesPopupStore.setCurrentConversationId(action.conversationId);
    MessagesPopupStore.setThreadState();
    MessagesPopupStore.emitChange();
    break;
  case 'closeMessagesPopup':
    MessagesPopupStore.setConversationsState();
    MessagesPopupStore.emitChange();
    break;
  case 'startSelectMode':
    MessagesPopupStore.startSelect();
    MessagesPopupStore.emitChange();
    break;
  case 'stopSelectMode':
    MessagesPopupStore.stopSelect();
    MessagesPopupStore.emitChange();
    break;
  }
});

export default MessagesPopupStore;
