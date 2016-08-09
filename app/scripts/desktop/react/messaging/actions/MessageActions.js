export const MSG_MESSAGE_POST_REQUEST = 'MSG_MESSAGE_POST_REQUEST';
export const MSG_MESSAGE_POST_SUCCESS = 'MSG_MESSAGE_POST_SUCCESS';
export const MSG_MESSAGE_POST_FAILURE = 'MSG_MESSAGE_POST_FAILURE';


/*
postMessage({ conversationId, content, files, uuid, replyMessage }) {
  return this.requester.postMessage(conversationId, content, files, uuid,
      replyMessage && replyMessage.uuid)
    .done((message) => {
      MessagingDispatcher.messageReceived(message);
      if (window.ga) {
        window.ga('send', 'event', 'UX', 'SendMessage');
      }
    })
    .fail((errMsg) => {
      MessagingDispatcher.handleServerAction({
        type: 'messageSendingError',
        conversationId: conversationId,
        uuid: uuid,
      });
      NoticeService.errorResponse(errMsg);
    });
}
markAsReadMessage(conversationId, messageId) {
  return this.requester.markAsReadMessage(conversationId, messageId)
    .fail((errMsg) => {
      console.error('Проблема при прочтении сообщения', errMsg);
    });
}


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


*/
