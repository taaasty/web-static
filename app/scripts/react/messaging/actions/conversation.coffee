window.ConversationActions = 

  clickConversation: (conversationId) ->
    MessagingDispatcher.handleViewAction {
      type: 'clickConversation'
      conversationId: conversationId
    }

  postNewConversation: ({ recipientSlug, error }) ->
    messagingService.postNewConversation { recipientSlug, error }