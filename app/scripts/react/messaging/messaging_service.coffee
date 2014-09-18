CHANGE_EVENT = 'change'

_totalUnreadConversationsCount = null
requester = new MockMessagingRequester access_token: tastyUser.api_key.access_token

window.MessagingService = _.extend {}, EventEmitter.prototype, {

  #routeNewMessage:  ({ conversationId, messageId }) -> "#{ conversationId }/message/#{ messageId }"
  #routeReadMessage: ({ conversationId, messageId }) -> "#{ conversationId }/read/#{ messageId }"
  #routeStatus: -> '/status'
  #routeConversationStatus:    ({ conversationId }) -> "#{ converastionId }/status"
  #routeConversationPayloaded: ({ conversationId }) -> "#{ conversationId }/payload"

  # Возвращает
  # unread
  # conversationMetaRoute: ({ conversationId }) -> "#{ conversationId }:meta"

  # Запрашиваем MessagingMetaInfo асинхронно
  connect: ({ success, error }) ->
    requester.makeConnect()
      .done (metaInfo) =>
        MessagingDispatcher.handleServerAction {
          type: 'totalUnreadConversationUpdate'
          count: metaInfo.status.totalUnreadConversationsCount
        }
        @bindMessagingStatusUpdate()
        success()
      .fail error

  close: ->
    # TODO unbind all

  # принимает обновленный <MessagingStatus>
  # подписывается на него bubble
  bindMessagingStatusUpdate: ->
    setInterval (->
      MessagingDispatcher.handleServerAction {
        type: 'totalUnreadConversationUpdate'
        count: MessagingMocker.stubMessagingMetaInfo().status.totalUnreadConversationsCount
      }
    ), 5000

  # # newConversationCallback - принимает <Conversation>
  # # подписывается на него список бесед
  # bindIncomingConversation: (callback) ->
  #   setInterval (-> callback MessagingMocker.stubIncomingConversation() ), 2000

  # postNewConversation: ({recipientSlug, messageContent, success, error}) ->
  #   @requester.makeNewConversation()
  #     .done success
  #     .fail error

  # postNewMessageInConversation: ({conversationId, recipientId, messageContent}) ->

  #requestConversation: (conversationId, callback, messagesLimit) ->
    #@addListener @routeConversation(conversationId), callback
    #@requester.makeConversationRequest(messagesLimit)

  #newConversation: -> @requester.newConversation arguments
  #postMessage:     -> @requester.postMessage arguments
  #markMessageAsRead: (messageId) -> @requester.markMessageAsRead messageId

  ## Мессенджер подписывается на все новые сообщения, чтобы
  #addListenerToFreshMessagesCount: (callback) ->

  #addListenerToNewMessageInConversationArrived: (conversationId, callback) ->

}