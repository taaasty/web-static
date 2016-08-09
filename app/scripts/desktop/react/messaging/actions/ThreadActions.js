export const MSG_THREAD_STOP_SELECT = 'MSG_THREAD_STOP_SELECT';
export const MSG_THREAD_START_SELECT = 'MSG_THREAD_START_SELECT';
export const MSG_THREAD_RESET_SELECTION = 'MSG_THREAD_RESET_SELECTION';
export const MSG_THREAD_SET_REPLY_TO = 'MSG_THREAD_SET_REPLY_TO';
export const MSG_THREAD_CANCEL_REPLY_TO = 'MSG_THREAD_CANCEL_REPLY_TO';

export function startSelect() {
  return {
    type: MSG_THREAD_START_SELECT,
  };
}

export function stopSelect() {
  return {
    type: MSG_THREAD_STOP_SELECT,
  };
}

export function resetSelect() {
  return {
    type: MSG_THREAD_RESET_SELECTION,
  };
}

export function setReplyToId(messageId) {
  return {
    type: MSG_THREAD_SET_REPLY_TO,
    messageId,
  };
}

export function cancelReplyTo() {
  return {
    type: MSG_THREAD_CANCEL_REPLY_TO,
  };
}


/*
deleteMessages(conversationId, msgIds, all = false) {
  return this.requester.deleteMessages(conversationId, msgIds, all)
    .done((data) => data)
    .fail((err) => NoticeService.errorResponse(err));
}
=============================================================

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

    setReplyTo() {
      _replyTo = _selectedIds[0];
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
