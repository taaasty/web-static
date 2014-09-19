class window.MessagingService
  EVENT_STATUS: 'status'
  EVENT_ACTIVE_CONVERSATIONS: 'active_conversations'

  CHANNEL_MAIN: (userId) -> "private-#{userId}-messaging"

  constructor: ({ @user }) ->
    MessagingDispatcher.changeConnectionState ConnectionStateStore.PROCESS_STATE
    @pusher = new Pusher gon.pusher.key,
      authEndpoint: Routes.api.pusher_auth_url()
      auth:
        headers:
          'X-User-Token': @user.api_key.access_token

    @channel = @pusher.subscribe @CHANNEL_MAIN(@user.id)
    @channel.bind 'pusher:subscription_succeeded', @_connected
    @channel.bind 'pusher:subscription_error',     (error) ->
      TastyNotifyController.notify 'error', 'Соединение не установлено'
      MessagingDispatcher.changeConnectionState ConnectionStateStore.ERROR_STATE

    @channel.bind @EVENT_STATUS,                   MessagingDispatcher.updateMessagingStatus
    @channel.bind @EVENT_ACTIVE_CONVERSATIONS,     MessagingDispatcher.updateActiveConversations

    @messagesContainer = $('<\div>', {'popup-messages-container': ''}).appendTo('body')[0]

  reconnect: ->
    MessagingDispatcher.changeConnectionState ConnectionStateStore.PROCESS_STATE
    @channel = @pusher.subscribe @CHANNEL_MAIN(@user.id)

  _connected: =>
    MessagingDispatcher.changeConnectionState ConnectionStateStore.CONNECTED_STATE

    @requester = new MessagingRequester
      access_token: @user.api_key.access_token
      socket_id: @pusher.connection.socket_id
    @requester.notifyReady
      success: -> console.log 'Server is notified'
      error: (error) -> console.error? "Error", error

    @pusher.connection.bind 'unavailable', (error) -> console.log "pusher unavailable", error
    @pusher.connection.bind 'failed',      (error) -> console.log "pusher failer", error

  postNewConversation: ({ recipientSlug, error }) ->
    @requester.postNewConversation(recipientSlug)
      .done (conversation) =>
        MessagingDispatcher.handleServerAction
          type: 'postNewConversation'
          conversation: conversation
      .fail error

  toggleMessagesPopup: ->
    if @messagesPopup?._lifeCycleState=='MOUNTED'
      React.unmountComponentAtNode @messagesContainer
    else
      @messagesPopup = React.renderComponent MessagesPopup(), @messagesContainer
