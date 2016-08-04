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

function channelMain(userId) {
  return `private-${userId}-messaging`;
}

class MessagingService extends EventEmitter {
  constructor(dispatch, user) {
    dispatch(connectionStateProcess());

    super();
    this.user = user;
    this.dispatch = dispatch;
    this.pusher = new Pusher(gon.pusher.key, {
      authEndpoint: ApiRoutes.pusher_auth_url(),
      pong_timeout: 6000,
      unavailable_timeout: 2000,
      auth: {
        headers: {
          'X-User-Token': this.user.apiKey.accessToken,
        },
      },
    });

    this.channel = this.pusher.subscribe(channelMain(this.user.id));
    this.channel.bind('pusher:subscription_succeeded', this._connected, this);
    this.channel.bind('pusher:subscription_error', () => {
      NoticeService.notify('error', i18n.t('pusher_subscription_error'));
      this.dispatch(connectionStateError());
    });

    this.channel.bind_all((_type='', data) => {
      const type = _type.replace(/^(public_|group_)/, '');

      switch (type) {
      case EVENT_STATUS:
        return MessagingDispatcher.updateMessagingStatus(data);
      case EVENT_UPDATE_CONVERSATION:
        return MessagingDispatcher.updateConversation(data);
      case EVENT_PUSH_MESSAGE:
        return MessagingDispatcher.messageReceived(data);
      case EVENT_UPDATE_MESSAGES:
        return MessagingDispatcher.messagesUpdated(data);
      case EVENT_PUSH_NOTIFICATION:
        return MessagingDispatcher.notificationReceived(data);
      case EVENT_UPDATE_NOTIFICATIONS:
        return MessagingDispatcher.notificationsUpdated(data);
      case EVENT_DELETE_MESSAGES:
        return MessagingDispatcher.deleteMessages(data);
      case EVENT_DELETE_USER_MESSAGES:
        return MessagingDispatcher.deleteUserMessages(data);
      case EVENT_TYPING:
        return MessagingDispatcher.typing(data);
      }
    });

    this.messagesContainer = $('<\div>', { 'popup-messages-container': '' }).appendTo('body')[0];
    this.notificationsContainer = $('<\div>', { 'popup-notifications-container': '' }).appendTo('body')[0];
  }
  reconnect() {
    this.dispatch(connectionStateProcess());
    this.channel = this.pusher.subscribe(channelMain(this.user.id));
  }

  _connected() {
    this.dispatch(connectionStateConnected());
    const updateOnlineStatuses = this.updateOnlineStatuses.bind(this);

    this.requester = new MessagingRequester({
      access_token: this.user.api_key.access_token,
      socket_id: this.pusher.connection.socket_id,
    });

    this.requester.notifyReady({
      success(data) {
        console.log('Server is notified');

        MessagingDispatcher.handleServerAction({
          type: 'conversationsLoaded',
          conversations: data.conversations,
        });

        MessagingDispatcher.handleServerAction({
          type: 'notificationsLoaded',
          notifications: data.notifications,
        });

        updateOnlineStatuses();
      },
      error(err) {
        console.error('Error', err);
      },
    });

    this.pusher.connection.bind('unavailable', (error) => console.log('pusher unavailable', error));
    this.pusher.connection.bind('failed', (error) => console.log('pusher failed', error));
    this.pusher.connection.bind('connected', this.emitReconnect, this);
  }
  emitReconnect() {
    return this.emit(EVENT_RECONNECT);
  }
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

    this.osId = window.setTimeout(this.updateOnlineStatuses.bind(this), 10*60*1000);
  }
  sendTyping(conversationId) {
    return this.requester.sendTyping(conversationId);
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
        NoticeService.notifySuccess(i18n.t('messenger.request.conversation_delete_success'));
        return data;
      })
      .fail((err) => NoticeService.errorResponse(err));
  }
  leaveConversation(conversationId) {
    return this.requester.leaveConversation(conversationId)
      .done((data) => {
        NoticeService.notifySuccess(i18n.t('messenger.request.conversation_leave_success'));
        return data;
      })
      .fail((err) => NoticeService.errorResponse(err));
  }
  deleteMessages(conversationId, msgIds, all=false) {
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
        console.error('Проблема при загрузке сообщений для переписки', error);
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
        console.error('Проблема при загрузке сообщений для переписки', error);
      });
  }
  postMessage({ conversationId, content, files, uuid, replyMessage }) {
    return this.requester.postMessage(conversationId, content, files, uuid, replyMessage && replyMessage.uuid)
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
