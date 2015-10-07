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
};

export default ConversationActions;
