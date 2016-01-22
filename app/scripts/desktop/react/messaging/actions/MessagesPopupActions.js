/*global messagingService */
import MessagingDispatcher from '../MessagingDispatcher';

const MessagesPopupActions = {
  closeMessagesPopup() {
    messagingService.closeMessagesPopup();
    MessagingDispatcher.handleViewAction({
      type: 'closeMessagesPopup',
    });
  },
  
  closeNotificationsPopup() {
    messagingService.closeNotificationsPopup();
  },

  openMessagesPopup() {
    messagingService.openMessagesPopup();
  },

  openNotificationsPopup() {
    messagingService.openNotificationsPopup();
  },

  toggleMessagesPopup() {
    messagingService.toggleMessagesPopup();
  },

  toggleNotificationsPopup() {
    messagingService.toggleNotificationsPopup();
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
