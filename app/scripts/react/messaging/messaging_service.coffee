class window.MessagingService

  #routeNewMessage:  ({ conversationId, messageId }) -> "#{ conversationId }/message/#{ messageId }"
  #routeReadMessage: ({ conversationId, messageId }) -> "#{ conversationId }/read/#{ messageId }"
  #routeStatus: -> '/status'
  #routeConversationStatus:    ({ conversationId }) -> "#{ converastionId }/status"
  #routeConversationPayloaded: ({ conversationId }) -> "#{ conversationId }/payload"

  constructor: ({ @user }) ->
    # _.extend @, new EventEmitter()

    @requester = new MockMessagingRequester(access_token: @user.api_key.access_token)
    @socker = new SockerAgent user: @user

  connect: ({ connectSuccess, connectError }) ->
    @socker.connect()
    @socker.pusher.connection.bind 'connected', connectSuccess
    @socker.pusher.connection.bind 'unavailable', connectError
    @socker.pusher.connection.bind 'failed',      connectError

  _statusUpdate: (messagingStatus) ->
    MessagingStatusStore.updateStatus messagingStatus
    statusUpdate messagingStatus


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
  
  close: -> console.error? "This is inpossible!"

class window.SockerAgent
  CHANNEL_STATUS: 'status'
  CHANNEL_MAIN: (userId) -> "private-#{userId}-messaging"

  constructor: ({@user}) ->
    @pusher = new Pusher gon.pusher.key,
      authEndpoint: gon.pusher.authEndpoint
      auth:
        params:
          acces_key: @user.api_key.access_key

  connect: ->
    @channel = @pusher.subscribe CHANNEL_MAIN(@user.id)
    @channel.bind 'pusher:subscription_succeeded', (data) ->
      debugger
    @channel.bind 'pusher:subscription_error', @_subscriptionError
    @channel.bind @EVENT_STATUS, @_statusUpdate, callback: statusUpdate

  _subscriptionError: (status) ->
    TastyNotifyController.errorResponse "Can't subscribe to private channe. Error is #{status}"
