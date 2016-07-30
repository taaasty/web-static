/*global messagingService */
import MessagingDispatcher from '../MessagingDispatcher';
import UuidService from '../../../../shared/react/services/uuid';

const MessageActions = {
  newMessage({ conversationId, content, files, replyMessage }) {
    const uuid = UuidService.generate();

    MessagingDispatcher.messageSubmitted({
      conversationId,
      content,
      files,
      uuid,
      replyMessage
    });
    messagingService.postMessage({
      conversationId,
      content,
      files,
      uuid,
      replyMessage
    });
  },

  readMessage(conversationId, messageId) {
    MessagingDispatcher.markAsReadMessage(conversationId, messageId);
    messagingService.markAsReadMessage(conversationId, messageId);
  },

  resendMessage({ conversationId, content, files, uuid, replyMessage }) {
    messagingService.postMessage({
      conversationId,
      content,
      files,
      uuid,
      replyMessage
    });
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
