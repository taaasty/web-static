class window.MessagingService
  EVENT_STATUS: 'status'
  EVENT_ACTIVE_CONVERSATIONS: 'active_conversations'
  EVENT_UPDATE_CONVERSATION:  'update_conversation'
  EVENT_PUSH_MESSAGE:         'push_message'
  EVENT_UPDATE_MESSAGES:      'update_messages'

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
    @channel.bind 'pusher:subscription_error', (error) ->
      TastyNotifyController.notify 'error', 'Соединение не установлено'
      MessagingDispatcher.changeConnectionState ConnectionStateStore.ERROR_STATE

    @channel.bind @EVENT_STATUS,               MessagingDispatcher.updateMessagingStatus
    @channel.bind @EVENT_ACTIVE_CONVERSATIONS, MessagingDispatcher.updateActiveConversations
    @channel.bind @EVENT_UPDATE_CONVERSATION,  MessagingDispatcher.updateConversation
    @bindPushMessages()
    @bindUpdateMessages()

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
      .fail (errMsg) ->
        error?()
        TastyNotifyController.errorResponse errMsg

  openConversation: (conversationId) ->
    @loadMessages conversationId

  loadMessages: (conversationId) ->
    @requester.loadMessages(conversationId)
      .done (data) ->
        MessagingDispatcher.handleServerAction
          type: 'messagesLoaded'
          conversationId: conversationId
          messages: data.messages
      .fail (error) ->
        console.error 'Проблема при загрузке сообщений для переписки', error

  loadMoreMessages: (conversationId, toMessageId) ->
    @requester.loadMoreMessages(conversationId, toMessageId)
      .done (data) ->
        MessagingDispatcher.handleServerAction
          type: 'moreMessagesLoaded'
          conversationId: conversationId
          messages: data.messages
          allMessagesLoaded: data.scope_count < 10
      .fail (error) ->
        console.error 'Проблема при загрузке сообщений для переписки', error

  resendMessage: ({ conversationId, content, uuid, error }) ->
    @requester.postMessage(conversationId, content, uuid)
      .done (message) ->
        MessagingDispatcher.messageResubmitted message
      .fail error

  postMessage: ({ conversationId, content, uuid }) ->
    @requester.postMessage(conversationId, content, uuid)
      .done (message) ->
        MessagingDispatcher.newMessageReceived message
      .fail (errMsg) ->
        MessagingDispatcher.handleServerAction {
          type: 'messageSendingError'
          conversationId: conversationId
          uuid: uuid
        }
        TastyNotifyController.errorResponse errMsg

  markAsReadMessage: (conversationId, messageId) ->
    @requester.markAsReadMessage(conversationId, messageId)
      .fail (errMsg) ->
        console.error 'Проблема при прочтении сообщения', errMsg

  toggleMessagesPopup: ->
    if @messagesPopup?._lifeCycleState is 'MOUNTED'
      React.unmountComponentAtNode @messagesContainer
    else
      @messagesPopup = React.renderComponent MessagesPopup(), @messagesContainer

  bindPushMessages: ->
    @channel.bind @EVENT_PUSH_MESSAGE, MessagingDispatcher.newMessageReceived

  unbindPushMessages: ->
    @channel.unbind @EVENT_PUSH_MESSAGE, MessagingDispatcher.newMessageReceived

  bindUpdateMessages: ->
    @channel.bind @EVENT_UPDATE_MESSAGES, MessagingDispatcher.messagesUpdated

  unbindUpdateMessages: ->
    @channel.unbind @EVENT_UPDATE_MESSAGES, MessagingDispatcher.messagesUpdated