/*global Dispatcher, require */
import _ from 'lodash';
import BeepService from '../../../shared/react/services/Beep';

const IncomingMsgSound = 'income_message.mp3';
const SubmitMsgSound = 'submit_message.mp3';

const MessagingDispatcher = Object.assign(
  new Dispatcher(), {
    handleViewAction(action) {
      return this.dispatch({ source: 'VIEW_ACTION', action });
    },

    handleServerAction(action) {
      return this.dispatch({ source: 'SERVER_ACTION', action });
    },

    updateMessagingStatus(messagingStatus) {
      return MessagingDispatcher.handleServerAction({
        messagingStatus,
        type: 'updateMessagingStatus',
      });
    },

    updateConversation(conversation) {
      return MessagingDispatcher.handleServerAction({
        conversation,
        type: 'updateConversation',
      });
    },

    changeConnectionState(state) {
      return MessagingDispatcher.handleServerAction({
        state,
        type: 'connectionState',
      });
    },

    messageReceived(message) {
      const ConversationsStore = require('./stores/ConversationsStore'); //FIXME circular dep
      const conversation = message.conversation || ConversationsStore.getConversation(
        message.conversation_id);

      console.info('Получено сообщение', message);

      if (!conversation) {
        BeepService.play();
      } else if (message.user_id !== conversation.user_id) {
        if (message.conversation) {
          if (!message.conversation.not_disturb) {
            BeepService.play(IncomingMsgSound);
          }
        } else {
          BeepService.play(IncomingMsgSound);
        }
      }

      return MessagingDispatcher.handleServerAction({
        message,
        conversationId: message.conversation_id,
        type: 'messageReceived',
      });
    },

    notificationReceived(notification) {
      console.info('Получено уведомление', notification);

      BeepService.play(IncomingMsgSound);

      return MessagingDispatcher.handleServerAction({
        notification,
        type: 'notificationReceived',
      });
    },

    messagesUpdated(data) {
      return MessagingDispatcher.handleServerAction({
        type: 'messagesUpdated',
        conversationId: data.conversation_id,
        messages: data.messages,
      });
    },

    notificationsUpdated(data) {
      return MessagingDispatcher.handleServerAction({
        type: 'notificationsUpdated',
        notifications: data.notifications,
      });
    },

    messageSubmitted({ conversationId, content, files, uuid, replyMessage }) {
      const ConversationsStore = require('./stores/ConversationsStore'); //FIXME circular dep
      const conversation = ConversationsStore.getConversation(conversationId);
      const currentUserId = conversation.user_id;
      const recipient = conversation.recipient;
      const message = {
        content,
        files,
        uuid,
        content_html: _.escape(content),
        conversation_id: conversationId,
        recipient_id: recipient && recipient.id,
        user_id: currentUserId,
        reply_message: replyMessage,
      };

      BeepService.play(SubmitMsgSound);

      return MessagingDispatcher.handleViewAction({
        conversationId,
        message,
        type: 'messageSubmitted',
      });
    },

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

    typing({ conversation_id, user_id }) {
      return MessagingDispatcher.handleServerAction({
        type: 'conversationTyping',
        id: conversation_id,
        userId: user_id,
      });
    },
  }
);

export default MessagingDispatcher;
