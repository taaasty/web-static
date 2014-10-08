window.PopupActions = 

  closeMessagesPopup: ->
    messagingService.closeMessagesPopup()
    MessagingDispatcher.handleViewAction {
      type: 'closeMessagesPopup'
    }

  openMessagesPopup: ->
    messagingService.openMessagesPopup()

  toggleMessagesPopup: ->
    messagingService.toggleMessagesPopup()