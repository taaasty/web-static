/*global messagingService, TastyEvents */
import MessagingDispatcher from '../MessagingDispatcher';
import ConversationsStore from '../stores/ConversationsStore';
import EntryActionCreators from '../../actions/Entry';

function updateConversationEntry(id, func) {
  const conversation = ConversationsStore.getConversation(id);
  if (!(conversation && conversation.entry)) {
    return null;
  };

  return func(conversation.entry.id);
}

const ConversationActions = {
  clickConversation(conversationId) {
    return MessagingDispatcher.handleViewAction({
      type: 'openConversation',
      conversationId: conversationId,
    });
  },

  openConversation(recipientId) {
    const conversation = ConversationsStore.getConversationByUserId(recipientId);

    if (conversation) {
      MessagingDispatcher.handleViewAction({
        type: 'openConversation',
        conversationId: conversation.id,
      });
    } else {
      messagingService.postNewConversation({ recipientId });
    }

    messagingService.openMessagesPopup();
    return TastyEvents.emit(TastyEvents.keys.command_hero_close());
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

  postNewConversation({recipientId, error}) {
    return messagingService.postNewConversation({ recipientId, error });
  },

  conversationEntryAddToFavorites(id) {
    return updateConversationEntry(id, EntryActionCreators.addToFavorites)
      .then((data) => {
        MessagingDispatcher.handleServerAction({
          type: 'updateConversationEntry',
          id: id,
          update: { is_favorited: true },
        });
      });
  },

  conversationEntryRemoveFromFavorites(id) {
    return updateConversationEntry(id, EntryActionCreators.removeFromFavorites)
      .then((data) => {
        MessagingDispatcher.handleServerAction({
          type: 'updateConversationEntry',
          id: id,
          update: { is_favorited: false },
        });
      });
  },

  conversationEntryAddToWatching(id) {
    return updateConversationEntry(id, EntryActionCreators.addToWatching)
      .then((data) => {
        MessagingDispatcher.handleServerAction({
          type: 'updateConversationEntry',
          id: id,
          update: { is_watching: true },
        });
      });
  },

  conversationEntryRemoveFromWatching(id) {
    return updateConversationEntry(id, EntryActionCreators.removeFromWatching)
      .then((data) => {
        MessagingDispatcher.handleServerAction({
          type: 'updateConversationEntry',
          id: id,
          update: { is_watching: false },
        });
      });
  },
};

export default ConversationActions;
