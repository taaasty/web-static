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
