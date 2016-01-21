/*global Dispatcher, BeepService, CurrentUserStore, require */
import _ from 'lodash';

const MessagingDispatcher = _.extend(
  new Dispatcher(),
  {
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
      console.info('Получено сообщение', message);

      if (message.user_id !== CurrentUserStore.getUserID()) {
        BeepService.play();
      }

      if (message.conversation) {
        MessagingDispatcher.updateConversation(message.conversation);
      }

      return MessagingDispatcher.handleServerAction({
        message,
        conversationId: message.conversation_id,
        type: 'messageReceived',
      });
    },

    notificationReceived(notification) {
      console.info('Получено уведомление', notification);

      BeepService.play();

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

    messageSubmitted({ conversationId, content, files, uuid }) {
      const ConversationsStore = require('./stores/ConversationsStore'); //FIXME circular dep
      const conversation = ConversationsStore.getConversation(conversationId);
      const currentUserId = CurrentUserStore.getUserID();
      const recipient = conversation.recipient;
      const message = {
        content,
        files,
        uuid,
        content_html: _.escape(content),
        conversation_id: conversationId,
        recipient_id: recipient && recipient.id,
        user_id: currentUserId,
      };

      return MessagingDispatcher.handleViewAction({
        conversationId,
        message,
        type: 'messageSubmitted',
      });
    },
  }
);

export default MessagingDispatcher;
