/*global $ */
import ApiRoutes from '../../../shared/routes/api';

export default class MessagingRequester {
  constructor({ access_token, socket_id }) {
    this.access_token = access_token;
    this.socket_id = socket_id;
  }
  deleteConversation(id) {
    return $.ajax({
      url: ApiRoutes.messengerConversationsById(id),
      method: 'DELETE',
      data: { socket_id: this.socket_id },
    });
  }
  leaveConversation(id) {
    return $.ajax({
      url: ApiRoutes.messengerConversationsByIdLeave(id),
      method: 'PUT',
      data: { socket_id: this.socket_id },
    });
  }
  deleteMessages(conversationId, ids = [], all) {
    return $.ajax({
      url: ApiRoutes.messengerDeleteMessages(conversationId),
      method: 'DELETE',
      data: {
        socket_id: this.socket_id,
        ids: ids.join(','),
        all: all,
      },
    });
  }
  markAsReadMessage(conversationId, messageId) {
    return $.ajax({
      url: ApiRoutes.messenger_read_messages_url(conversationId),
      method: 'POST',
      data: {
        _method: 'PUT',
        socket_id: this.socket_id,
        ids: messageId,
      },
    });
  }
  markAsReadNotification(notificationId) {
    return $.ajax({
      url: ApiRoutes.notifications_read_url(notificationId),
      method: 'POST',
      data: {
        _method: 'PUT',
        socket_id: this.socket_id,
        id: notificationId,
      },
    });
  }
  dontDisturb(id, flag) {
    return $.ajax({
      url: ApiRoutes.messengerDontDisturb(id),
      method: 'POST',
      data: {
        socket_id: this.socket_id,
        _method: !flag && 'DELETE' || void 0,
      },
    });
  }
  getOnlineStatuses(ids) {
    return $.ajax({
      url: ApiRoutes.onlineStatuses(),
      method: 'GET',
      data: {
        socket_id: this.socket_id,
        user_ids: ids.join(','),
      },
    });
  }
}
