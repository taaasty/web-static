/*global Dispatcher, require */
import _ from 'lodash';
import BeepService from '../../../shared/react/services/Beep';

const IncomingMsgSound = 'income_message.mp3';
const SubmitMsgSound = 'submit_message.mp3';

const MessagingDispatcher = Object.assign(
  new Dispatcher(), {
    toggleSelection(id) {
      MessagingDispatcher.handleViewAction({
        id,
        type: 'messagesToggleSelection',
      });
    },

    resetSelection() {
      MessagingDispatcher.handleViewAction({
        type: 'messagesResetSelection',
      });
    },

    deleteMessages({ conversation_id, messages }) {
      return MessagingDispatcher.handleServerAction({
        messages,
        conversationId: conversation_id,
        type: 'deleteMessages',
      });
    },

    deleteUserMessages({ conversation_id, messages }) {
      return MessagingDispatcher.handleServerAction({
        messages,
        conversationId: conversation_id,
        type: 'deleteUserMessages',
      });
    },

    markAsReadMessage(conversationId) {
      return MessagingDispatcher.handleViewAction({
        type: 'decreaseUnreadCount',
        id: conversationId,
      });
    },

  }
);

export default MessagingDispatcher;
