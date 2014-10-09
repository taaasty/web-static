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

  toggleMessagesPopup: ->
    messagingService.toggleMessagesPopup()

  toggleNotificationsPopup: ->
    messagingService.toggleNotificationsPopup()