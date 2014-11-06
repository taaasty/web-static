window.ConversationActions = 

  clickConversation: (conversationId) ->
    MessagingDispatcher.handleViewAction {
      type: 'openConversation'
      conversationId: conversationId
    }

  openConversation: (recipientSlug) ->
    conversation = ConversationsStore.getConversationBySlug recipientSlug

    if conversation?
      MessagingDispatcher.handleViewAction {
        type: 'openConversation'
        conversationId: conversation.id
      }
    else
      messagingService.postNewConversation { recipientSlug }

    messagingService.openMessagesPopup()

  postNewConversation: ({ recipientSlug, error }) ->
    messagingService.postNewConversation { recipientSlug, error }