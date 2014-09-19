class window.MessagingService
  EVENT_STATUS: 'status'
  EVENT_ACTIVE_CONVERSATIONS: 'active_conversations'

  CHANNEL_MAIN: (userId) -> "private-#{userId}-messaging"

  constructor: ({ @user }) ->
    @pusher = new Pusher gon.pusher.key,
      authEndpoint: gon.pusher.authEndpoint
      auth:
        headers:
          'X-User-Token': @user.api_key.access_token

    @channel = @pusher.subscribe @CHANNEL_MAIN(@user.id)
    @channel.bind 'pusher:subscription_succeeded', @_connected
    @channel.bind 'pusher:subscription_error',     MessagingDispatcher.connectionError
    @channel.bind @EVENT_STATUS,                   MessagingDispatcher.updateMessagingStatus
    @channel.bind @EVENT_ACTIVE_CONVERSATIONS,     MessagingDispatcher.updateActiveConversations

    @messagesContainer = $('<\div>', {'popup-messages-container': ''}).appendTo('body')[0]

  _connected: =>
    MessagingDispatcher.connected()
    @requester = new MessagingRequester
      access_token: @user.api_key.access_token
      socket_id: @pusher.connection.socket_id
    @requester.notifyReady
      success: -> console.log 'Server is notified'
      error: (error) -> console.error? "Error", error

    #@socker.pusher.connection.bind 'unavailable', connectError
    #@socker.pusher.connection.bind 'failed',      connectError

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
