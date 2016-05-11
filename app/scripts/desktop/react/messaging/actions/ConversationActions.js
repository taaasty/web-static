/*global messagingService, TastyEvents */
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

  sendTyping(id) {
    return messagingService.sendTyping(id);
  },
};

export default ConversationActions;
