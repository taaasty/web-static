class window.MessagingService
  routeNewMessage:  ({conversationId, messageId}) -> "#{conversationId}/message/#{messageId}"
  routeReadMessage: ({conversationId, messageId}) -> "#{conversationId}/read/#{messageId}"
  routeMetaInfo:    () -> '/metaInfo'
  routeStatus:      () -> '/status'
  routeConversationStatus: ({conversationId})    -> "#{converastionId}/status"
  routeConversationPayloaded: ({conversationId}) -> "#{conversationId}/payload"

  # Возвращает
  # unread
  conversationMetaRoute: ({conversationId}) -> "#{conversationId}:meta"

  constructor: ({@debug, @user}) ->
    _.extent @, EventEmitter

    @requester = new MessagingRequester

    if @debug
      @addListener @routeNewMessage('*','*'),  (message)  -> console.debug? "New message", message
      @addListener @routeReadMessage('*','*'), (message)  -> console.debug? "Read message", message
      @addListener @routeMetaInfo(),           (metaInto) -> console.debug? "MetaInfo: ", metaINfo

  # Запрашиваем MessagingMetaInfo асинхронно
  requestMetaInfo: (callback) ->
    @addListener routeMetaInfo(), callback
    @requester.makeMetaInfoRequest()

  requestConversation: (conversationId, callback, messagesLimit) ->
    @addListener @routeConversation(conversationId), callback
    @requester.makeConversationRequest(messagesLimit)

  newConversation: -> @requester.newConversation arguments
  postMessage:     -> @requester.postMessage arguments
  markMessageAsRead: (messageId) -> @requester.markMessageAsRead messageId

  # Мессенджер подписывается на все новые сообщения, чтобы
  addListenerToFreshMessagesCount: (callback) ->

  addListenerToNewMessageInConversationArrived: (conversationId, callback) ->



window.messaging = new MessagingService debug: true
