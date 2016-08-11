import createReducer from '../../reducers/createReducer';
import {
  MSG_THREAD_START_SELECT,
  MSG_THREAD_STOP_SELECT,
  MSG_THREAD_RESET_SELECTION,
  MSG_THREAD_SET_REPLY_TO,
  MSG_THREAD_CANCEL_REPLY_TO,
  MSG_THREAD_SET_MESSAGE_TEXT,
  MSG_THREAD_ADD_MESSAGE_FILES,
  MSG_THREAD_REMOVE_MESSAGE_FILE,
  MSG_THREAD_RESET_FORM,
} from '../actions/ThreadActions';
import { Set, fromJS } from 'immutable';

const initialState = fromJS({
  isSelectState: false,
  selectedIds: Set(),
  replyToId: null,
  messageText: '',
  messageFiles: [],
});

const actionMap = {
  [MSG_THREAD_START_SELECT](state) {
    return state.set('isSelectState', true);
  },

  [MSG_THREAD_STOP_SELECT](state) {
    return state.set('isSelectState', false);
  },

  [MSG_THREAD_RESET_SELECTION](state) {
    return state.set('selectedIds', Set());
  },

  [MSG_THREAD_SET_REPLY_TO](state, { messageId }) {
    return state.set('replyToId', messageId);
  },

  [MSG_THREAD_CANCEL_REPLY_TO](state) {
    return state.set('replyToId', null);
  },

  [MSG_THREAD_SET_MESSAGE_TEXT](state, { text }) {
    return state.set('messageText', text || '');
  },

  [MSG_THREAD_ADD_MESSAGE_FILES](state, { files }) {
    const arrFiles = [].slice.call(files); // convert to Array

    return state.update('messageFiles', (arr) => arr.concat(arrFiles));
  },

  [MSG_THREAD_REMOVE_MESSAGE_FILE](state, { file }) {
    return state.update('messageFiles', (arr) => arr.filter((f) => f !== file));
  },

  [MSG_THREAD_RESET_FORM](state) {
    return state.merge({
      messageText: '',
      messageFiles: [],
    });
  },
};

export default createReducer(initialState, actionMap);


/*

import BaseStore from '../../stores/BaseStore';
import MessagingDispatcher from '../MessagingDispatcher';
import ConversationsStore from '../stores/ConversationsStore';
import { PUBLIC_CONVERSATION, GROUP_CONVERSATION } from '../constants';

const _messages = {};
const _allMessagesLoaded = {};
let _selectedIds = [];
let _replyTo = null;

const MessagesStore = Object.assign(
  new BaseStore(), {
    pushMessages(conversationId, messages) {
      const clonedMessages = (_messages[conversationId] || [])
        .slice(0);

      messages.forEach((message) => {
        if (!this.isMessageExists(conversationId, message)) {
          clonedMessages.push(message);
        }
      });

      _messages[conversationId] = clonedMessages;
    },

    unshiftMessages(conversationId, messages) {
      const loadedMessages = messages.reverse();
      const clonedMessages = _messages[conversationId].slice(0);

      loadedMessages.forEach((loadedMessage) => clonedMessages.unshift(
        loadedMessage));

      _messages[conversationId] = clonedMessages;
    },

    updateMessage(conversationId, data) {
      const messages = _messages[conversationId] || [];

      messages.forEach((message) => {
        if (message.uuid === data.uuid) {
          if (message.read_at && !data.read_at) { //FIXME temporal fix for race condition
            delete(data.read_at);
          }
          Object.assign(message, data);
        }
      });
    },

    getMessages(conversationId) {
      return _messages[conversationId] || [];
    },

    getMessageById(id, conversationId) {
      const messages = _messages[conversationId] || [];

      return messages.filter((msg) => msg.id === id)[0];
    },

    isMessageExists(conversationId, message) {
      const messages = (_messages[conversationId] || [])
        .filter((msg) => msg.uuid === message.uuid);

      return !!messages.length;
    },

    isAllMessagesLoaded(conversationId) {
      return _allMessagesLoaded[conversationId];
    },

    sortByAsc(conversationId) {
      const clonedMessages = _messages[conversationId].slice(0);
      clonedMessages.sort((a, b) => a.id - b.id);

      _messages[conversationId] = clonedMessages;
    },

    addToSelection(id) {
      if (_selectedIds.indexOf(id) < 0) {
        _selectedIds.push(id);
      }
    },

    removeFromSelection(id) {
      const idx = _selectedIds.indexOf(id);
      if (idx > -1) {
        _selectedIds.splice(idx, 1);
      }
    },

    toggleSelection(id) {
      const idx = _selectedIds.indexOf(id);

      if (idx > -1) {
        this.removeFromSelection(id);
      } else {
        this.addToSelection(id);
      }
    },

    resetSelection() {
      _selectedIds = [];
    },

    setReplyTo() {
      _replyTo = _selectedIds[0];
    },

    cancelReplyTo() {
      _replyTo = null;
    },

    getReplyMessage(conversationId) {
      return _replyTo && this.getMessageById(_replyTo, conversationId);
    },

    getSelection() {
      return _selectedIds;
    },

    isSelected(id) {
      return (_selectedIds.indexOf(id) > -1);
    },

    canDelete() {
      return _selectedIds.length > 0;
    },

    canDeleteEverywhere(conversationId) {
      let msg;

      return (_selectedIds.filter((id) => {
          if ((msg = this.getMessageById(id, conversationId))) {
            const msgInfo = this.getMessageInfo(msg, conversationId);

            return msgInfo.type === 'incoming';
          } else {
            return false;
          }
        }))
        .length === 0 && this.canDelete();
    },

    canReply() {
      return _selectedIds.length === 1;
    },

    deleteMessages(conversationId, deleted) {
      const messages = _messages[conversationId] || [];

      _selectedIds = _selectedIds.filter((id) => deleted.indexOf(id) < 0);
      _messages[conversationId] = messages.filter((msg) => deleted.indexOf(
        msg.id) < 0);
    },

    deleteUserMessages(conversationId, deleted) {
      const messages = _messages[conversationId] || [];
      const deletedHash = deleted.reduce((acc, { id, content, ...rest }) => {
        return acc[id] = {...rest, content_html: content }, acc;
      }, {});
      const deletedIds = Object.keys(deletedHash)
        .map((id) => parseInt(id, 10));

      _selectedIds = _selectedIds.filter((id) => deletedIds.indexOf(id) < 0);
      messages.forEach((msg) => {
        if (deletedHash[msg.id]) {
          Object.assign(msg, deletedHash[msg.id]);
        }
      });
    },
  }
);

MessagesStore.dispatchToken = MessagingDispatcher.register(({ action }) => {
  switch (action.type) {
  case 'messagesLoaded':
    MessagesStore.pushMessages(action.conversationId, action.messages);
    MessagesStore.sortByAsc(action.conversationId);
    MessagesStore.emitChange();
    break;
  case 'moreMessagesLoaded':
    _allMessagesLoaded[action.conversationId] = action.allMessagesLoaded;

    MessagesStore.unshiftMessages(action.conversationId, action.messages);
    MessagesStore.emitChange();
    break;
  case 'messagesUpdated':
    action.messages.forEach((message) => (
      MessagesStore.updateMessage(action.conversationId, message)
    ));

    MessagesStore.emitChange();
    break;
  case 'messageReceived':
    const message = Object.assign(action.message, { sendingState: null });

    if (MessagesStore.isMessageExists(action.conversationId, message)) {
      MessagesStore.updateMessage(action.conversationId, message);
    } else {
      MessagesStore.pushMessages(action.conversationId, [message]);
      MessagesStore.sortByAsc(action.conversationId);
    }

    ConversationsStore.cancelTyping(action.conversationId, message.user_id);
    MessagesStore.emitChange();
    break;
  case 'messageSubmitted':
    MessagesStore.pushMessages(action.conversationId, [action.message]);
    MessagesStore.cancelReplyTo();
    MessagesStore.emitChange();
    break;
  case 'messageSendingError':
    MessagesStore.updateMessage(action.conversationId, {
      uuid: action.uuid,
      sendingState: 'error',
    });
    MessagesStore.emitChange();
    break;
  case 'messagesToggleSelection':
    MessagesStore.toggleSelection(action.id);
    MessagesStore.emitChange();
    break;
  case 'closeMessagesPopup':
  case 'openConversation':
  case 'openConversationList':
    MessagesStore.cancelReplyTo();
  case 'messagesResetSelection':
  case 'startSelect':
  case 'stopSelect':
    MessagesStore.resetSelection();
    MessagesStore.emitChange();
    break;
  case 'setReplyTo':
    MessagesStore.setReplyTo();
    MessagesStore.resetSelection();
    MessagesStore.emitChange();
    break;
  case 'cancelReplyTo':
    MessagesStore.cancelReplyTo();
    MessagesStore.emitChange();
  case 'deleteMessages':
    MessagesStore.deleteMessages(action.conversationId, action.messages);
    MessagesStore.emitChange();
    break;
  case 'deleteUserMessages':
    MessagesStore.deleteUserMessages(action.conversationId, action.messages);
    MessagesStore.emitChange();
    break;
  };
});

export default MessagesStore;
*/
