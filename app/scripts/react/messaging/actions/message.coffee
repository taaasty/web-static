window.MessageActions = 

  newMessage: ({ conversationId, content, uuid }) ->
    MessagingDispatcher.messageSent { conversationId, content, uuid }
    messagingService.postMessage { conversationId, content, uuid }

  readMessage: (conversationId, messageId) ->
    messagingService.markAsReadMessage conversationId, messageId

  loadMoreMessages: ({ conversationId, toMessageId }) ->
    messagingService.loadMoreMessages conversationId, toMessageId