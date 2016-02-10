/*global messagingService */
import MessagingDispatcher from '../MessagingDispatcher';

const MessagesPopupActions = {
  closeMessagesPopup() {
    messagingService.closeMessagesPopup();
    MessagingDispatcher.handleViewAction({
      type: 'closeMessagesPopup',
    });
  },
  
  openMessagesPopup() {
    messagingService.openMessagesPopup();
  },

  toggleMessagesPopup() {
    messagingService.toggleMessagesPopup();
  },

  openConversationList() {
    MessagingDispatcher.handleViewAction({
      type: 'openConversationList',
    });
  },

  startSelect() {
    MessagingDispatcher.handleViewAction({
      type: 'startSelect',
    });
  },

  stopSelect() {
    MessagingDispatcher.handleViewAction({
      type: 'stopSelect',
    });
  },
};

export default MessagesPopupActions;
