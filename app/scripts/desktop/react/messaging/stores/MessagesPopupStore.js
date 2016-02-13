import BaseStore from '../../stores/BaseStore';
import MessagingDispatcher from '../MessagingDispatcher';
import ConversationsStore from './ConversationsStore';

export const CONVERSATIONS_STATE = 'conversations';
export const CREATE_NEW_CONVERSATION_STATE = 'createNewConversation';
export const THREAD_STATE = 'thread';
export const GROUP_CHOOSER_STATE = 'groupChooser';
export const GROUP_SETTINGS_STATE = 'groupSettings';

//let currentState = CONVERSATIONS_STATE;
let selectState = false;
let conversationId = null;
let _history = [ CONVERSATIONS_STATE ];

const MessagesPopupStore = Object.assign(
  new BaseStore(),
  {
    getCurrentState() {
      return _history[_history.length - 1];
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
      _history.push(THREAD_STATE);
    },

    setCreateNewConversationState() {
      _history.push(CREATE_NEW_CONVERSATION_STATE);
    },

    setConversationsState() {
      _history = [ CONVERSATIONS_STATE ];
    },

    backButtonClick() {
      _history.pop(); //TODO improve back button logic
    },

    startSelect() {
      selectState = _history[_history.length - 1] === THREAD_STATE; // set to true only if in thread state
    },

    stopSelect() {
      selectState = false;
    },

    showGroupSettings() {
      const prev = _history[_history.length - 2];

      //prevent multiple cycles of chooser/settings navigation
      if (prev === GROUP_SETTINGS_STATE) {
        this.backButtonClick();
      } else {
        _history.push(GROUP_SETTINGS_STATE);
      }
    },

    showGroupChooser() {
      const prev = _history[_history.length -2];

      if (prev === GROUP_CHOOSER_STATE) {
        this.backButtonClick();
      } else {
        _history.push(GROUP_CHOOSER_STATE);
      }
    },

    closeGroupSettings() {
      _history.pop();
      const last = _history[_history.length - 1];

      if ([ GROUP_CHOOSER_STATE, GROUP_SETTINGS_STATE ].indexOf(last) > -1) {
        _history.pop();
      }
    },
  }
);

MessagesPopupStore.dispatchToken = MessagingDispatcher.register(({ action }) => {
  switch (action.type) {
  case 'postNewConversation':
    MessagingDispatcher.waitFor([ ConversationsStore.dispatchToken ]);
    MessagesPopupStore.setCurrentConversationId(action.conversation.id);
    MessagesPopupStore.setThreadState();
    MessagesPopupStore.stopSelect();
    MessagesPopupStore.emitChange();
    break;
  case 'clickNewConversation':
    MessagesPopupStore.setCreateNewConversationState();
    MessagesPopupStore.stopSelect();
    MessagesPopupStore.emitChange();
    break;
  case 'openConversationList':
    MessagesPopupStore.setConversationsState();
    MessagesPopupStore.stopSelect();
    MessagesPopupStore.emitChange();
    break;
  case 'openConversation':
    MessagesPopupStore.setCurrentConversationId(action.conversationId);
    MessagesPopupStore.setThreadState();
    MessagesPopupStore.stopSelect();
    MessagesPopupStore.emitChange();
    break;
  case 'closeMessagesPopup':
    MessagesPopupStore.setConversationsState();
    MessagesPopupStore.stopSelect();
    MessagesPopupStore.emitChange();
    break;
  case 'startSelect':
    MessagesPopupStore.startSelect();
    MessagesPopupStore.emitChange();
    break;
  case 'stopSelect':
    MessagesPopupStore.stopSelect();
    MessagesPopupStore.emitChange();
    break;
  case 'showGroupSettings':
    MessagesPopupStore.showGroupSettings();
    MessagesPopupStore.stopSelect();
    MessagesPopupStore.emitChange();
    break;
  case 'showGroupChooser':
    MessagesPopupStore.showGroupChooser();
    MessagesPopupStore.stopSelect();
    MessagesPopupStore.emitChange();
    break;
  case 'closeGroupSettings':
    MessagesPopupStore.closeGroupSettings();
    MessagesPopupStore.emitChange();
    break;
  case 'backButtonClick':
    MessagesPopupStore.backButtonClick();
    MessagesPopupStore.stopSelect();
    MessagesPopupStore.emitChange();
    break;
  }
});

export default MessagesPopupStore;
