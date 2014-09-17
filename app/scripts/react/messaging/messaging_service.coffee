class window.MessagingService

  #routeNewMessage:  ({ conversationId, messageId }) -> "#{ conversationId }/message/#{ messageId }"
  #routeReadMessage: ({ conversationId, messageId }) -> "#{ conversationId }/read/#{ messageId }"
  #routeStatus: -> '/status'
  #routeConversationStatus:    ({ conversationId }) -> "#{ converastionId }/status"
  #routeConversationPayloaded: ({ conversationId }) -> "#{ conversationId }/payload"

  # Возвращает
  # unread
  # conversationMetaRoute: ({ conversationId }) -> "#{ conversationId }:meta"

  constructor: ({ @debug, @user, @mock }) ->
    @mock = true
    # _.extend @, new EventEmitter()

    @requester = new MockMessagingRequester(access_token: @user.api_key.access_token)

    # if @debug
    #   @addListener @routeNewMessage('*','*'),  (message)  -> console.debug? "New message", message
    #   @addListener @routeReadMessage('*','*'), (message)  -> console.debug? "Read message", message

  # Запрашиваем MessagingMetaInfo асинхронно
  connect: ({ success, error }) ->
    @requester.makeConnect()
      .done success
      .fail error

  close: ->
    # TODO unbind all

  # принимает обновленный <MessagingStatus>
  # подписывается на него bubble
  bindMessagingStatusUpdate: (callback) ->
    if @mock
      setInterval (-> callback MessagingMocker.stubMessagingStatus() ), 5000

  # newConversationCallback - принимает <Conversation>
  # подписывается на него список бесед
  bindIncomingConversation: (callback) ->
      setInterval (-> callback MessagingMocker.stubIncomingConversation() ), 2000

  postNewConversation: ({recipientSlug, messageContent, success, error}) ->
    @requester.makeNewConversation()
      .done success
      .fail error

  postNewMessageInConversation: ({conversationId, recipientId, messageContent}) ->

  #requestConversation: (conversationId, callback, messagesLimit) ->
    #@addListener @routeConversation(conversationId), callback
    #@requester.makeConversationRequest(messagesLimit)

  #newConversation: -> @requester.newConversation arguments
  #postMessage:     -> @requester.postMessage arguments
  #markMessageAsRead: (messageId) -> @requester.markMessageAsRead messageId

  ## Мессенджер подписывается на все новые сообщения, чтобы
  #addListenerToFreshMessagesCount: (callback) ->

  #addListenerToNewMessageInConversationArrived: (conversationId, callback) ->
