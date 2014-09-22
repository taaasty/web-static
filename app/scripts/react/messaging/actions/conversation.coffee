window.ConversationActions = 

  clickConversation: (conversationId) ->
    MessagingDispatcher.handleViewAction {
      type: 'clickConversation'
      conversationId: conversationId
    }