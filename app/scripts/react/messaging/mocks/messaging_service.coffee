class window.MessagingServiceMock extends window.MessagingService

  constructor: ({ @user }) ->
    @requester = new MockMessagingRequester(access_token: @user.api_key.access_token)


  # Запрашиваем MessagingMetaInfo асинхронно
  connect: ({ connectSuccess, connectError }) ->
    @requester.makeConnect()
      .done (metaInfo) =>
        MessagingDispatcher.handleServerAction {
          type: 'totalUnreadConversationUpdate'
          count: metaInfo.status.totalUnreadConversationsCount
        }
        @bindMessagingStatusUpdate()
        connectSuccess()
      .fail connectError

  bindMessagingStatusUpdate: ->
    setInterval (->
      MessagingDispatcher.handleViewAction {
          type: 'totalUnreadConversationUpdate'
          count: MessagingMocker.stubMessagingMetaInfo().status.totalUnreadConversationsCount
      }
    ), 5000

  bindIncomingConversation: (callback) ->
    setInterval (-> callback MessagingMocker.stubIncomingConversation() ), 2000

