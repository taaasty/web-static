/*global messagingService, UuidService */
import MessagingDispatcher from '../MessagingDispatcher';

const MessageActions = {
  newMessage({ conversationId, content, files, replyMessage }) {
    const uuid = UuidService.generate();

    MessagingDispatcher.messageSubmitted({ conversationId, content, files, uuid, replyMessage });
    messagingService.postMessage({ conversationId, content, files, uuid, replyMessage });
  },
  
  readMessage(conversationId, messageId) {
    MessagingDispatcher.markAsReadMessage(conversationId, messageId);
    messagingService.markAsReadMessage(conversationId, messageId);
  },

  resendMessage({ conversationId, content, files, uuid, replyMessage }) {
    messagingService.postMessage({ conversationId, content, files, uuid, replyMessage });
  },

  loadMoreMessages({ conversationId, toMessageId, limit }) {
    return messagingService.loadMoreMessages(conversationId, toMessageId, limit);
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
