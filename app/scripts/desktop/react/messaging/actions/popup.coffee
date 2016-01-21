MessagingDispatcher = require '../MessagingDispatcher';

window.PopupActions = 

  closeMessagesPopup: ->
    messagingService.closeMessagesPopup()
    MessagingDispatcher.handleViewAction {
      type: 'closeMessagesPopup'
    }

  closeNotificationsPopup: ->
    messagingService.closeNotificationsPopup()

  openMessagesPopup: ->
    messagingService.openMessagesPopup()

  openNotificationsPopup: ->
    messagingService.openNotificationsPopup()

  toggleMessagesPopup: ->
    messagingService.toggleMessagesPopup()

  toggleNotificationsPopup: ->
    messagingService.toggleNotificationsPopup()
