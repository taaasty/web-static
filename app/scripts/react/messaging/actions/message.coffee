window.MessageActions = 

  newMessage: ({ conversationId, content, success, error }) ->
    messagingService.postMessage { conversationId, content, success, error }