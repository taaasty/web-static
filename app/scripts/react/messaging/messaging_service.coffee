class window.MessagingService

  #routeNewMessage:  ({ conversationId, messageId }) -> "#{ conversationId }/message/#{ messageId }"
  #routeReadMessage: ({ conversationId, messageId }) -> "#{ conversationId }/read/#{ messageId }"
  #routeStatus: -> '/status'
  #routeConversationStatus:    ({ conversationId }) -> "#{ converastionId }/status"
  #routeConversationPayloaded: ({ conversationId }) -> "#{ conversationId }/payload"

  constructor: ({ @user, @mock }) ->
    @mock = true
    # _.extend @, new EventEmitter()

    @requester = new MockMessagingRequester(access_token: @user.api_key.access_token)

  # Запрашиваем MessagingMetaInfo асинхронно
  connect: ({ success, error }) ->
    @requester.makeConnect()
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
    if @mock
      setInterval (->
        MessagingDispatcher.handleServerAction {
            type: 'totalUnreadConversationUpdate'
            count: MessagingMocker.stubMessagingMetaInfo().status.totalUnreadConversationsCount
        }
      ), 5000

  # newConversationCallback - принимает <Conversation>
  # подписывается на него список бесед
  # bindIncomingConversation: (callback) ->
  #     setInterval (-> callback MessagingMocker.stubIncomingConversation() ), 2000

  postNewConversation: ({ recipientSlug, success, error }) ->
    @requester.makeNewConversation(recipientSlug)
      .done (newConversation) =>
        MessagingDispatcher.handleServerAction {
          type: 'newConversationReceived'
          conversation: newConversation
        }
        success()
      .fail error

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