class window.MessagingServiceMock extends window.MessagingService

  constructor: ({ @user }) ->
    @requester = new MockMessagingRequester(access_token: @user.api_key.access_token)


  # Запрашиваем MessagingMetaInfo асинхронно
  connect: ({ connectSuccess, connectError }) ->
    @requester.makeConnect()
      .done (metaInfo) =>
        MessagingDispatcher.handleServerAction {
          type: 'unreadConversationUpdate'
          count: metaInfo.status.unreadConversationsCount
        }
        @bindMessagingStatusUpdate()
        connectSuccess()
      .fail connectError

  bindMessagingStatusUpdate: ->
    setInterval (->
      MessagingDispatcher.handleViewAction {
          type: 'unreadConversationUpdate'
          count: MessagingMocker.stubMessagingMetaInfo().status.unreadConversationsCount
      }
    ), 5000

  bindIncomingConversation: (callback) ->
    setInterval (-> callback MessagingMocker.stubIncomingConversation() ), 2000

