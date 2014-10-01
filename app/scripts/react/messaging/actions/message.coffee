window.MessageActions = 

  newMessage: ({ conversationId, content }) ->
    uuid = UuidService.generate()

    MessagingDispatcher.messageSubmitted { conversationId, content, uuid }
    messagingService.postMessage { conversationId, content, uuid }

  readMessage: (conversationId, messageId) ->
    messagingService.markAsReadMessage conversationId, messageId

  resendMessage: ({ conversationId, content, uuid }) ->
    messagingService.postMessage { conversationId, content, uuid }

  loadMoreMessages: ({ conversationId, toMessageId }) ->
    messagingService.loadMoreMessages conversationId, toMessageId