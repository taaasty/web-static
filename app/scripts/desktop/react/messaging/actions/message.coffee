MessagingDispatcher = require '../MessagingDispatcher';

window.MessageActions = 

  newMessage: ({ conversationId, content, files }) ->
    uuid = UuidService.generate()

    MessagingDispatcher.messageSubmitted { conversationId, content, files, uuid }
    messagingService.postMessage { conversationId, content, files, uuid }

  readMessage: (conversationId, messageId) ->
    messagingService.markAsReadMessage conversationId, messageId

  resendMessage: ({ conversationId, content, files, uuid }) ->
    messagingService.postMessage { conversationId, content, files, uuid }

  loadMoreMessages: ({ conversationId, toMessageId }) ->
    messagingService.loadMoreMessages conversationId, toMessageId
