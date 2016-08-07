import { CALL_API, Schemas } from '../../middleware/api';
import ApiRoutes from '../../../../shared/routes/api';
import { postOpts } from '../../actions/reqHelpers';

export const MSG_CONVERSATIONS_POST_REQUEST = 'MSG_CONVERSATIONS_POST_REQUEST';
export const MSG_CONVERSATIONS_POST_SUCCESS = 'MSG_CONVERSATIONS_POST_SUCCESS';
export const MSG_CONVERSATIONS_POST_FAILURE = 'MSG_CONVERSATIONS_POST_FAILURE';

export function postNewConversation(userId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.messengerConversationsByUserId(userId),
      schema: Schemas.CONVERSATION,
      types: [
        MSG_CONVERSATIONS_POST_REQUEST,
        MSG_CONVERSATIONS_POST_SUCCESS,
        MSG_CONVERSATIONS_POST_FAILURE,
      ],
      opts: postOpts(),
    },
  };
}


/*
import MessagingDispatcher from '../MessagingDispatcher';
import ConversationsStore from '../stores/ConversationsStore';

const ConversationActions = {
  clickConversation(conversationId) {
    return MessagingDispatcher.handleViewAction({
      type: 'openConversation',
      conversationId: conversationId,
    });
  },

  openConversation(recipientId) {
    const conversation = ConversationsStore.getConversationByUserId(
      recipientId);

    if (conversation) {
      MessagingDispatcher.handleViewAction({
        type: 'openConversation',
        conversationId: conversation.id,
      });
    } else {
      messagingService.postNewConversation({ recipientId });
    }

    messagingService.openMessagesPopup();
    //return TastyEvents.emit(TastyEvents.keys.command_hero_close());
    // TODO: implement hero closing when opens message popup
  },

  deleteConversation(id) {
    return messagingService.deleteConversation(id);
  },

  leaveConversation(id) {
    return messagingService.leaveConversation(id)
      .done((data) => {
        MessagingDispatcher.handleServerAction({
          type: 'deleteConversation',
          id: id,
        });
        return data;
      });
  },

  dontDisturb(id, flag) {
    return messagingService.dontDisturb(id, flag);
  },

  postNewConversation({ recipientId, error }) {
    return messagingService.postNewConversation({ recipientId, error });
  },

};

export default ConversationActions;


====================================================

import BaseStore from '../../stores/BaseStore';
import MessagingDispatcher from '../MessagingDispatcher';
import { PRIVATE_CONVERSATION, TYPING_CANCEL_INTERVAL } from '../constants';

let _conversations = [];
let _typing = {};

const ConversationsStore = Object.assign(
  new BaseStore(), {
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

    findConversation(conversationId) {
      const [conv] = _conversations.filter(({ id }) => id === conversationId);

      return conv || void 0;
    },

    getConversation(conversationId) {
      const conv = this.findConversation(conversationId);
      return conv ? {...conv, typing: this.getTyping(conv.id) } : void 0;
    },

    getConversationByUserId(recipientId) {
      const [conv] = _conversations
        .filter(({ recipient }) => recipient && recipient.id === recipientId);
      return conv ? {...conv, typing: this.getTyping(conv.id) } : void 0;
    },

    getConversations() {
      return _conversations.map((conv) => ({...conv,
        typing: this.getTyping(
          conv.id)
      }));
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
      const conversation = this.findConversation(conversationId);

      return Object.assign(conversation.entry, update);
    },

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

ConversationsStore.dispatchToken = MessagingDispatcher.register(({ action }) => {
  switch (action.type) {
  case 'postNewConversation':
    ConversationsStore.unshiftConversations([action.conversation]);
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
      ConversationsStore.unshiftConversations([action.conversation]);
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
  }
});

export default ConversationsStore;
*/
