import BaseStore from '../../stores/BaseStore';
import MessagingDispatcher from '../MessagingDispatcher';

let _conversations = [];

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

    getConversation(conversationId) {
      const convs = _conversations.filter(({ id }) => id === conversationId);
      return convs[0];
    },

    getConversationByUserId(recipientId) {
      const convs = _conversations
              .filter(({ recipient }) => recipient && recipient.id === recipientId);
      return convs[0];
    },

    getConversations() {
      return _conversations;
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
  }
});

export default ConversationsStore;
