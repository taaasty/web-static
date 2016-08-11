/*
import BaseStore from '../../stores/BaseStore';
import MessagingDispatcher from '../MessagingDispatcher';
import { PRIVATE_CONVERSATION, TYPING_CANCEL_INTERVAL } from '../constants';

let _conversations = [];
let _typing = {};

const ConversationsStore = Object.assign(
  new BaseStore(), {
    decreaseUnreadCount(conversationId) {
      const conversation = this.findConversation(conversationId);

      if (!conversation) {
        return;
      }

      const { unread_messages_count: unreadCount } = conversation;

      if (unreadCount && unreadCount > 0) {
        conversation.unread_messages_count = unreadCount - 1;
      }
    },

    unreadCount(conversationId) {
      const conversation = this.findConversation(conversationId);

      return conversation && conversation.unread_messages_count;
    },

    unreadCountByUserId(userId) {
      const conversation = this.getConversationByUserId(userId);

      return conversation && conversation.unread_messages_count;
    },

    updateOnlineStatuses(convIds = [], data = []) {
      const statusMap = data.reduce((acc, item) => ({...acc, [item.user_id]: item }), {});

      convIds.forEach((conversationId) => {
        const conversation = this.findConversation(conversationId);
        if (conversation && conversation.type === PRIVATE_CONVERSATION) {
          conversation.recipient.is_online = statusMap[conversation.recipient_id]
            .is_online;
          conversation.recipient.last_seen_at = statusMap[conversation.recipient_id]
            .last_seen_at;
        }
      });
    },

  }
);
*/
