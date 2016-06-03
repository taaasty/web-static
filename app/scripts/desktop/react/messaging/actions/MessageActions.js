/*global messagingService, UuidService */
import MessagingDispatcher from '../MessagingDispatcher';

const MessageActions = {
  newMessage({ conversationId, content, files }) {
    const uuid = UuidService.generate();

    MessagingDispatcher.messageSubmitted({ conversationId, content, files, uuid });
    messagingService.postMessage({ conversationId, content, files, uuid });
  },
  
  readMessage(conversationId, messageId) {
    MessagingDispatcher.markAsReadMessage(conversationId, messageId);
    messagingService.markAsReadMessage(conversationId, messageId);
  },

  resendMessage({ conversationId, content, files, uuid }) {
    messagingService.postMessage({ conversationId, content, files, uuid });
  },

  loadMoreMessages({ conversationId, toMessageId }) {
    messagingService.loadMoreMessages(conversationId, toMessageId);
  },

  toggleSelection(id) {
    MessagingDispatcher.toggleSelection(id);
  },

  setReplyTo() {
    MessagingDispatcher.handleViewAction({
      type: 'setReplyTo',
    });
  },

  cancelReplyTo() {
    MessagingDispatcher.handleViewAction({
      type: 'cancelReplyTo',
    });
  },
};

export default MessageActions;
