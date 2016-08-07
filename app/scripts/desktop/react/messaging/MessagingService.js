/*global $, i18n, gon, EventEmitter */
/*eslint no-console: 0 */
import Pusher from 'pusher';
import ApiRoutes from '../../../shared/routes/api';
import {
  PRIVATE_CONVERSATION,
} from './constants';
import {
  connectionStateProcess,
  connectionStateConnected,
  connectionStateError,
} from './actions/ConnectionStateActions';
import NoticeService from '../services/Notice';

const EVENT_STATUS = 'status';
const EVENT_UPDATE_CONVERSATION = 'update_conversation';
const EVENT_PUSH_MESSAGE = 'push_message';
const EVENT_PUSH_NOTIFICATION = 'push_notification';
const EVENT_UPDATE_MESSAGES = 'update_messages';
const EVENT_UPDATE_NOTIFICATIONS = 'update_notifications';
const EVENT_DELETE_MESSAGES = 'delete_messages';
const EVENT_DELETE_USER_MESSAGES = 'delete_user_messages';
const EVENT_TYPING = 'typed';
const EVENT_RECONNECT = 'reconnected';

class MessagingService extends EventEmitter {
  updateOnlineStatuses() {
    const convMap = ConversationsStore.getConversations()
      .filter((conversation) => conversation.type === PRIVATE_CONVERSATION)
      .map(({ id, recipient_id }) => ({
        conversationId: id,
        recipientId: recipient_id,
      }));
    const userIds = convMap.map((item) => item.recipientId);
    const convIds = convMap.map((item) => item.conversationId);

    this.requester.getOnlineStatuses(userIds)
      .done((data) => MessagingDispatcher.handleServerAction({
        type: 'updateOnlineStatuses',
        convIds,
        data,
      }));

    if (this.osId) {
      window.clearTimeout(this.osId);
    }

    this.osId = window.setTimeout(this.updateOnlineStatuses.bind(this), 10 *
      60 * 1000);
  }
  postNewConversation({ recipientId, error }) {
    return this.requester.postNewConversation(recipientId)
      .done((conversation) => {
        return MessagingDispatcher.handleServerAction({
          type: 'postNewConversation',
          conversation: conversation,
        });
      })
      .fail((errMsg) => {
        if (typeof error === 'function') {
          error();
        }
        NoticeService.errorResponse(errMsg);
      });
  }
  deleteConversation(conversationId) {
    return this.requester.deleteConversation(conversationId)
      .done((data) => {
        MessagingDispatcher.handleServerAction({
          type: 'deleteConversation',
          id: conversationId,
        });
        NoticeService.notifySuccess(i18n.t(
          'messenger.request.conversation_delete_success'));
        return data;
      })
      .fail((err) => NoticeService.errorResponse(err));
  }
  leaveConversation(conversationId) {
    return this.requester.leaveConversation(conversationId)
      .done((data) => {
        NoticeService.notifySuccess(i18n.t(
          'messenger.request.conversation_leave_success'));
        return data;
      })
      .fail((err) => NoticeService.errorResponse(err));
  }
  deleteMessages(conversationId, msgIds, all = false) {
    return this.requester.deleteMessages(conversationId, msgIds, all)
      .done((data) => data)
      .fail((err) => NoticeService.errorResponse(err));
  }
  openConversation(conversationId) {
    return this.loadMessages(conversationId);
  }
  loadMessages(conversationId) {
    return this.requester.loadMessages(conversationId)
      .done((data) => {
        MessagingDispatcher.handleServerAction({
          type: 'messagesLoaded',
          conversationId: conversationId,
          messages: data.messages,
        });

        return data;
      })
      .fail((error) => {
        console.error('Проблема при загрузке сообщений для переписки',
          error);
      });
  }
  loadMoreMessages(conversationId, toMessageId) {
    return this.requester.loadMoreMessages(conversationId, toMessageId)
      .done((data) => {
        MessagingDispatcher.handleServerAction({
          type: 'moreMessagesLoaded',
          conversationId: conversationId,
          messages: data.messages,
          allMessagesLoaded: data.scope_count < 10,
        });

        return data;
      })
      .fail((error) => {
        console.error('Проблема при загрузке сообщений для переписки',
          error);
      });
  }
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
  markAsReadNotification(notificationId) {
    return this.requester.markAsReadNotification(notificationId)
      .fail((errMsg) => {
        console.error('Проблема при прочтении уведомления', errMsg);
      });
  }
  dontDisturb(id, flag) {
      return this.requester.dontDisturb(id, flag)
        .done((data) => {
          MessagingDispatcher.handleServerAction({
            type: 'updateConversation',
            conversation: data,
          });

          return data;
        })
        .fail((err) => NoticeService.errorResponse(err));
    }
    /*
    isMessagesPopupShown() {
      return this.messagesPopup && this.messagesPopup.isMounted();
    }
    closeMessagesPopup() {
      if (this.isMessagesPopupShown()) {
        unmountComponentAtNode(this.messagesContainer);
      }
    }
    openMessagesPopup() {
      if (!this.isMessagesPopupShown()) {
        this.messagesPopup = render(<MessagesPopup />, this.messagesContainer);
      }
    }
    */
  addReconnectListener(callback) {
    return this.on(EVENT_RECONNECT, callback);
  }
  removeReconnectListener(callback) {
    return this.off(EVENT_RECONNECT, callback);
  }
}

export default MessagingService;
