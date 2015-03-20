window.ConversationActions = 

  clickConversation: (conversationId) ->
    MessagingDispatcher.handleViewAction {
      type: 'openConversation'
      conversationId: conversationId
    }

  openConversation: (recipientId) ->
    conversation = ConversationsStore.getConversationByUserId recipientId

    if conversation?
      MessagingDispatcher.handleViewAction
        type: 'openConversation'
        conversationId: conversation.id
    else
      messagingService.postNewConversation {recipientId}

    messagingService.openMessagesPopup()
    TastyEvents.emit TastyEvents.keys.command_hero_close()

  postNewConversation: ({recipientId, error}) ->
    messagingService.postNewConversation { recipientId, error }