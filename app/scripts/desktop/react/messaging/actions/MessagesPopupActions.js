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

  backButtonClick() {
    MessagingDispatcher.handleViewAction({
      type: 'backButtonClick',
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

  openGroupSettings(data) {
    MessagingDispatcher.handleViewAction({
      type: 'groupSettingsInit',
      payload: data,
    });
    this.showGroupSettings();
  },

  openGroupChooser(data) {
    MessagingDispatcher.handleViewAction({
      type: 'groupSettingsInit',
      payload: data,
    });
    this.showGroupChooser();
  },

  showGroupSettings() {
    MessagingDispatcher.handleViewAction({
      type: 'showGroupSettings',
    });
  },

  showGroupChooser() {
    MessagingDispatcher.handleViewAction({
      type: 'showGroupChooser',
    });
  },
};

export default MessagesPopupActions;
