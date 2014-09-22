window.ConversationActions = 

  clickConversation: (conversationId) ->
    messagingService.loadMessages conversationId

    MessagingDispatcher.handleViewAction {
      type: 'clickConversation'
      conversationId: conversationId
    }