import BaseStore from '../../stores/BaseStore';
import MessagingDispatcher from '../MessagingDispatcher';
import { PRIVATE_CONVERSATION, TYPING_CANCEL_INTERVAL } from '../constants/ConversationConstants';

let _conversations = [];
let _typing = {};

const ConversationsStore = Object.assign(
  new BaseStore(),
  {
    unshiftConversations(conversations) {
      const clonedConversations = _conversations.slice(0);

      conversations.forEach((conversation) => {
        if (!this.isConversationExists(conversation)) {
          clonedConversations.unshift(conversation);
        }
      });

      _conversations = clonedConversations;
    },

    deleteConversation(id) {
      _conversations = _conversations.filter((conv) => conv.id !== id);
    },

    updateConversation(data) {
      const clonedConversations = _conversations.slice(0);

      clonedConversations.forEach((conversation, idx) => {
        if (conversation.id === data.id) {
          clonedConversations[idx] = data;
        }
      });

      _conversations = clonedConversations;
    },

    preloadConversationsImages(conversations) {
      conversations.forEach((conversation) => {
        const image = new Image();
        image.src = conversation.recipient.design.backgroundImageUrl;
      });
    },

    getTyping(conversationId) {
      return _typing[conversationId] || {};
    },

    getConversation(conversationId) {
      const [ conv ] = _conversations.filter(({ id }) => id === conversationId);
      return conv ? { ...conv, typing: this.getTyping(conv.id) } : void 0;
    },

    getConversationByUserId(recipientId) {
      const [ conv ] = _conversations
              .filter(({ recipient }) => recipient && recipient.id === recipientId);
      return conv ? { ...conv, typing: this.getTyping(conv.id) } : void 0;
    },

    getConversations() {
      return _conversations.map((conv) => ({ ...conv, typing: this.getTyping(conv.id) }));
    },

    sortByDesc() {
      const clonedConversations = _conversations.slice(0);

      _conversations = clonedConversations.sort((a, b) => (
        new Date(b.updated_at) - new Date(a.updated_at)
      ));
    },

    isConversationExists(conversation) {
      const convs = _conversations.filter(({ id }) => id === conversation.id);

      return !!convs.length;
    },

    updateConversationEntry(conversationId, update) {
      const conversation = this.getConversation(conversationId);

      return Object.assign(conversation.entry, update);
    },

    decreaseUnreadCount(conversationId) {
      const conversation = this.getConversation(conversationId);

      if (!conversation) {
        return;
      }

      const { unread_messages_count: unreadCount } = conversation;

      if (unreadCount && unreadCount > 0) {
        conversation.unread_messages_count = unreadCount - 1;
      }
    },

    unreadCount(conversationId) {
      const conversation = this.getConversation(conversationId);

      return conversation && conversation.unread_messages_count;
    },

    unreadCountByUserId(userId) {
      const conversation = this.getConversationByUserId(userId);

      return conversation && conversation.unread_messages_count;
    },

    updateOnlineStatuses(convIds=[], data=[]) {
      const statusMap = data.reduce((acc, item) => ({ ...acc, [item.user_id]: item }), {});

      convIds.forEach((conversationId) => {
        const conversation = this.getConversation(conversationId);
        if (conversation.type === PRIVATE_CONVERSATION) {
          conversation.recipient.is_online = statusMap[conversation.recipient_id].is_online;
          conversation.recipient.last_seen_at = statusMap[conversation.recipient_id].last_seen_at;
        }
      });
    },

    updateTyping(convId, userId) {
      const timeoutId = setTimeout(this.cancelTyping.bind(this, convId, userId), TYPING_CANCEL_INTERVAL);

      if (!_typing[convId]) {
        _typing[convId] = { [userId]: { timeoutId, eventAt: (new Date()).valueOf() } };
      } else {
        const userTyping = _typing[convId][userId];
        if (userTyping && userTyping.timeoutId) {
          clearTimeout(userTyping.timeoutId);
        }

        _typing[convId][userId] = { timeoutId, eventAt: (new Date()).valueOf() };
      }
    },

    cancelTyping(convId, userId) {
      const typing = _typing[convId];

      if (typing) {
        if (typing[userId] && typing[userId].timeoutId) {
          clearTimeout(typing[userId].timeoutId);
        }

        delete _typing[convId][userId];
        this.emitChange();
      }
    },
  }
);

ConversationsStore.dispatchToken = MessagingDispatcher.register(({ action }) => {
  switch (action.type) {
  case 'postNewConversation':
    ConversationsStore.unshiftConversations([ action.conversation ]);
    // ConversationsStore.preloadConversationsImages([action.conversation]);
    ConversationsStore.emitChange();
    break;
  case 'conversationsLoaded':
    ConversationsStore.unshiftConversations(action.conversations);
    // ConversationsStore.preloadConversationsImages(action.conversations);
    ConversationsStore.sortByDesc();
    ConversationsStore.emitChange();
    break;
  case 'updateConversation':
    if (ConversationsStore.isConversationExists(action.conversation)) {
      ConversationsStore.updateConversation(action.conversation);
    } else {
      ConversationsStore.unshiftConversations([ action.conversation ]);
      // ConversationsStore.preloadConversationsImages([action.conversation]);
    }

    ConversationsStore.sortByDesc();
    ConversationsStore.emitChange();
    break;
  case 'updateConversationEntry':
    ConversationsStore.updateConversationEntry(action.id, action.update);
    ConversationsStore.emitChange();
    break;
  case 'deleteConversation':
    ConversationsStore.deleteConversation(action.id);
    ConversationsStore.emitChange();
    break;
  case 'decreaseUnreadCount':
    ConversationsStore.decreaseUnreadCount(action.id);
    ConversationsStore.emitChange();
    break;
  case 'updateOnlineStatuses':
    ConversationsStore.updateOnlineStatuses(action.convIds, action.data);
    ConversationsStore.emitChange();
    break;
  case 'conversationTyping':
    ConversationsStore.updateTyping(action.id, action.userId);
    ConversationsStore.emitChange();
    break;
  case 'conversationCancelTyping':
    ConversationsStore.cancelTyping(action.id, action.userId);
    break;
  }
});

export default ConversationsStore;
