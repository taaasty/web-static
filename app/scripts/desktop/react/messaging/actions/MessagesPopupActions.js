import {
  stopSelect,
} from './MessagesActions';

export const MSG_POPUP_PUSH_HISTORY = 'MSG_POPUP_PUSH_HISTORY';
export const MSG_POPUP_POP_HISTORY = 'MSG_POPUP_POP_HISTORY';
export const MSG_POPUP_SET_HISTORY = 'MSG_POPUP_SET_HISTORY';

export const MSG_POPUP_STATE_CONVERSATIONS = 'MSG_POPUP_STATE_CONVERSATIONS';
export const MSG_POPUP_STATE_CREATE_NEW = 'MSG_POPUP_STATE_CREATE_NEW';
export const MSG_POPUP_STATE_THREAD = 'MSG_POPUP_STATE_THREAD';
export const MSG_POPUP_STATE_GROUP_CHOOSER = 'MSG_POPUP_STATE_GROUP_CHOOSER';
export const MSG_POPUP_STATE_GROUP_SETTINGS = 'MSG_POPUP_STATE_GROUP_SETTINGS';

export function initPopup() {
  return showConversationList();
}

function setHistory(history) {
  return (dispatch) => {
    dispatch(stopSelect());

    return dispatch({
      type: MSG_POPUP_SET_HISTORY,
      history,
    });
  };
}

function pushHistory(popupState) {
  return (dispatch) => {
    dispatch(stopSelect());

    return dispatch({
      type: MSG_POPUP_PUSH_HISTORY,
      popupState,
    });
  }
}

export function historyBack() {
  return (dispatch) => {
    dispatch(stopSelect());

    return dispatch({
      type: MSG_POPUP_POP_HISTORY,
    });
  };
}

export function showConversationList() {
  return setHistory([{ state: MSG_POPUP_STATE_CONVERSATIONS }]);
}

export function showCreateNew() {
  return pushHistory({ state: MSG_POPUP_STATE_CREATE_NEW });
}

export function showGroupSettings() {

}

export function showGroupChooser() {

}

export function showThread(conversationId) {
  return (dispatch) => {
    return dispatch(setHistory([
      { state: MSG_POPUP_STATE_CONVERSATIONS },
      { state: MSG_POPUP_STATE_THREAD, conversationId },
    ]));
  }
}

/*
import MessagingDispatcher from '../MessagingDispatcher';

const MessagesPopupActions = {
  closeMessagesPopup() {
    messagingService.closeMessagesPopup();
    MessagingDispatcher.handleViewAction({
      type: 'closeMessagesPopup',
    });
  },

  openMessagesPopup() {
    messagingService.openMessagesPopup();
  },

  openConversationList() {
    MessagingDispatcher.handleViewAction({
      type: 'openConversationList',
    });
  },

  openGroupSettings(data) {
    MessagingDispatcher.handleViewAction({
      type: 'groupSettingsInit',
      payload: data,
    });
    this.showGroupSettings();
  },

  openGroupChooser(data) {
    MessagingDispatcher.handleViewAction({
      type: 'groupSettingsInit',
      payload: data,
    });
    this.showGroupChooser();
  },

  showGroupSettings() {
    MessagingDispatcher.handleViewAction({
      type: 'showGroupSettings',
    });
  },

  showGroupChooser() {
    MessagingDispatcher.handleViewAction({
      type: 'showGroupChooser',
    });
  },
};

export default MessagesPopupActions;
*******************************************************************

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
      _history = [ CONVERSATIONS_STATE, THREAD_STATE ];
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
      _history = _history.filter((e) => [ GROUP_CHOOSER_STATE, GROUP_SETTINGS_STATE ].indexOf(e) < 0);
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
  case 'setReplyTo':
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


*/
