class window.MessagingService
  EVENT_STATUS: 'status'
  EVENT_ACTIVE_CONVERSATIONS: 'active_conversations'
  EVENT_UPDATE_CONVERSATION:  'update_conversation'

  CHANNEL_MAIN: (userId) -> "private-#{ userId }-messaging"

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

    @channel.bind @EVENT_STATUS,               MessagingDispatcher.updateMessagingStatus
    @channel.bind @EVENT_ACTIVE_CONVERSATIONS, MessagingDispatcher.updateActiveConversations
    @channel.bind @EVENT_UPDATE_CONVERSATION,  MessagingDispatcher.updateConversation

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
      .done (conversation) ->
        MessagingDispatcher.handleServerAction
          type: 'postNewConversation'
          conversation: conversation
      .fail error

  openConversation: (conversationId) ->
    @loadMessages conversationId

  loadMessages: (conversationId) ->
    @requester.loadMessages(conversationId)
      .done (data) ->
        MessagingDispatcher.handleServerAction
          type: 'messageListUpdated'
          conversationId: conversationId
          messages: data.messages
      .fail (error) ->
        console.error 'Проблема при загрузке сообщений для переписки', error

  postMessage: ({ conversationId, content, success, error, always }) ->
    @requester.postMessage(conversationId, content)
      .done (message) ->
        MessagingDispatcher.handleViewAction {
          type: 'messageReceived'
          conversationId: conversationId
          message: message
        }
        success?()
      .fail (errMsg) ->
        error?()
        TastyNotifyController.errorResponse errMsg
      .always always

  toggleMessagesPopup: ->
    if @messagesPopup?._lifeCycleState is 'MOUNTED'
      React.unmountComponentAtNode @messagesContainer
    else
      @messagesPopup = React.renderComponent MessagesPopup(), @messagesContainer