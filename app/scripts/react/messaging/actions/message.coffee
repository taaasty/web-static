window.MessageActions = 

  newMessage: ({ conversationId, content, uuid, success, error, always }) ->
    MessagingDispatcher.messageSent { conversationId, content, uuid }
    messagingService.postMessage { conversationId, content, uuid, success, error, always }

  readMessage: (conversationId, messageId) ->
    messagingService.markAsReadMessage conversationId, messageId

  loadMoreMessages: ({ conversationId, toMessageId }) ->
    messagingService.loadMoreMessages conversationId, toMessageId