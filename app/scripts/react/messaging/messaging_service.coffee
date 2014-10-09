mockNotifications = [{
  id: 1
  online: false
  action: 'ответил на ваш комментарий'
  text: 'Ох как я согласен!'
  image: null
  user: {
    created_at: "2014-01-04T14:47:02.000+04:00"
    features: {
      chat: true
      search: false
    }
    id: 220444
    is_daylog: false
    is_female: false
    is_privacy: false
    name: "densetos"
    private_entries_count: 0
    public_entries_count: 11
    slug: "densetos"
    title: "伝説的なオペレーティングシステム"
    tlog_url: "http://taaasty.ru/@densetos"
    total_entries_count: 11
    updated_at: "2014-10-07T23:45:20.000+04:00"
    userpic: {
      default_colors: {
        background: "#44d068"
        name: "#ffffff"
      }
      large_url: "http://taaasty.ru/assets/userpic/6b/f8/220444_large.jpg"
      original_url: "http://taaasty.ru/assets/userpic/6b/f8/220444_original.jpg"
      thumb64_url: "http://taaasty.ru/assets/userpic/6b/f8/220444_thumb64.jpg"
      thumb128_url: "http://taaasty.ru/assets/userpic/6b/f8/220444_thumb128.jpg"
      thumbor_path: "userpic/6b/f8/220444_original.jpg"
    }
  }
}, {
  id: 2
  online: true
  action: 'Упомянул вас в комментарии'
  text: 'Most instances of neuroplasticity-based changes in the brain are much more...'
  image: 'images/images/image_22.jpg'
  user: {
    created_at: "2011-05-22T18:55:14.000+04:00"
    features: {
      chat: true
      search: false
    }
    id: 48345
    is_daylog: false
    is_female: true
    is_privacy: false
    name: "pandemiya"
    private_entries_count: 0
    public_entries_count: 1617
    slug: "pandemiya"
    title: "..и пусть я как эмо буду бухой ночами реветь, а днями строить из себя супермена."
    tlog_url: "http://taaasty.ru/@pandemiya"
    total_entries_count: 1626
    updated_at: "2014-10-07T23:18:29.000+04:00"
    userpic: {
      default_colors: {
        background: "#eb4656"
        name: "#ffffff"
      }
      large_url: "http://taaasty.ru/assets/userpic/de/a0/48345_large.jpg"
      original_url: "http://taaasty.ru/assets/userpic/de/a0/48345_original.jpg"
      thumb64_url: "http://taaasty.ru/assets/userpic/de/a0/48345_thumb64.jpg"
      thumb128_url: "http://taaasty.ru/assets/userpic/de/a0/48345_thumb128.jpg"
      thumbor_path: "userpic/de/a0/48345_original.jpg"
    }
  }
}, {
  id: 3
  online: true
  action: 'прокомментировала вашу запись "Как вы думаете, что мн..."'
  text: '@madworld присоединяйся)'
  image: null
  user: {
    created_at: "2011-12-11T03:20:32.000+04:00"
    features: {
      chat: true
      search: false
    }
    id: 98945
    is_daylog: false
    is_female: false
    is_privacy: false
    name: "nof1000"
    private_entries_count: 16
    public_entries_count: 587
    slug: "nof1000"
    title: "Programmer &amp; Designer"
    tlog_url: "http://taaasty.ru/@nof1000"
    total_entries_count: 609
    updated_at: "2014-09-30T02:31:59.000+04:00"
    userpic: {
      default_colors: {
        background: "#3382da"
        name: "#ffffff"
      }
      large_url: "http://taaasty.ru/assets/userpic/a5/d9/98945_large.png"
      original_url: "http://taaasty.ru/assets/userpic/a5/d9/98945_original.png"
      thumb64_url: "http://taaasty.ru/assets/userpic/a5/d9/98945_thumb64.png"
      thumb128_url: "http://taaasty.ru/assets/userpic/a5/d9/98945_thumb128.png"
      thumbor_path: "userpic/a5/d9/98945_original.png"
    }
  }
}]

class window.MessagingService
  EVENT_STATUS: 'status'
  EVENT_ACTIVE_CONVERSATIONS: 'active_conversations'
  EVENT_UPDATE_CONVERSATION:  'update_conversation'
  EVENT_PUSH_MESSAGE:         'push_message'
  EVENT_UPDATE_MESSAGES:      'update_messages'
  RECONNECT_EVENT:            'reconnected'

  CHANNEL_MAIN: (userId) -> "private-#{ userId }-messaging"

  constructor: ({ @user }) ->
    MessagingDispatcher.changeConnectionState ConnectionStateStore.PROCESS_STATE

    _.extend @, EventEmitter.prototype

    @pusher = new Pusher gon.pusher.key,
      authEndpoint: Routes.api.pusher_auth_url()
      pong_timeout: 6000
      unavailable_timeout: 2000
      auth:
        headers:
          'X-User-Token': @user.api_key.access_token

    @channel = @pusher.subscribe @CHANNEL_MAIN(@user.id)
    @channel.bind 'pusher:subscription_succeeded', @_connected
    @channel.bind 'pusher:subscription_error', (error) ->
      TastyNotifyController.notify 'error', 'Соединение не установлено'
      MessagingDispatcher.changeConnectionState ConnectionStateStore.ERROR_STATE

    @channel.bind @EVENT_STATUS,              MessagingDispatcher.updateMessagingStatus
    # @channel.bind @EVENT_ACTIVE_CONVERSATIONS, MessagingDispatcher.updateActiveConversations
    @channel.bind @EVENT_UPDATE_CONVERSATION, MessagingDispatcher.updateConversation
    @bindPushMessages()
    @bindUpdateMessages()

    @messagesContainer      = $('<\div>', {'popup-messages-container': ''}).appendTo('body')[0]
    @notificationsContainer = $('<\div>', {'popup-notifications-container': ''}).appendTo('body')[0]

  reconnect: ->
    MessagingDispatcher.changeConnectionState ConnectionStateStore.PROCESS_STATE
    @channel = @pusher.subscribe @CHANNEL_MAIN(@user.id)

  _connected: =>
    MessagingDispatcher.changeConnectionState ConnectionStateStore.CONNECTED_STATE

    @requester = new MessagingRequester
      access_token: @user.api_key.access_token
      socket_id: @pusher.connection.socket_id

    @requester.notifyReady
      success: (data) ->
        console.log 'Server is notified'

        MessagingDispatcher.handleServerAction {
          type: 'conversationsLoaded'
          conversations: data.conversations
        }

        MessagingDispatcher.handleServerAction {
          type: 'notificationsLoaded'
          notifications: data.notifications || mockNotifications
        }
      error: (error) -> console.error? "Error", error

    @pusher.connection.bind 'unavailable', (error) -> console.log "pusher unavailable", error
    @pusher.connection.bind 'failed',      (error) -> console.log "pusher failer", error
    @pusher.connection.bind 'connected', @emitReconnect

  emitReconnect: =>
    @emit @RECONNECT_EVENT

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

  postMessage: ({ conversationId, content, uuid }) ->
    @requester.postMessage(conversationId, content, uuid)
      .done (message) ->
        MessagingDispatcher.messageReceived message
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

  isMessagesPopupShown:      -> @messagesPopup?._lifeCycleState is 'MOUNTED'
  isNotificationsPopupShown: -> @notificationsPopup?._lifeCycleState is 'MOUNTED'

  closeMessagesPopup: ->
    if @isMessagesPopupShown()
      React.unmountComponentAtNode @messagesContainer

  closeNotificationsPopup: ->
    if @isNotificationsPopupShown()
      React.unmountComponentAtNode @notificationsContainer

  openMessagesPopup: ->
    unless @isMessagesPopupShown()
      @messagesPopup = React.renderComponent MessagesPopup(), @messagesContainer

  openNotificationsPopup: ->
    unless @isNotificationsPopupShown()
      @notificationsPopup = React.renderComponent NotificationsPopup(), @notificationsContainer

  toggleMessagesPopup: ->
    if @isMessagesPopupShown() then @closeMessagesPopup() else @openMessagesPopup()

  toggleNotificationsPopup: ->
    if @isNotificationsPopupShown() then @closeNotificationsPopup() else @openNotificationsPopup()

  addReconnectListener: (callback) ->
    @on @RECONNECT_EVENT, callback

  removeReconnectListener: (callback) ->
    @off @RECONNECT_EVENT, callback

  bindPushMessages: ->
    @channel.bind @EVENT_PUSH_MESSAGE, MessagingDispatcher.messageReceived

  unbindPushMessages: ->
    @channel.unbind @EVENT_PUSH_MESSAGE, MessagingDispatcher.messageReceived

  bindUpdateMessages: ->
    @channel.bind @EVENT_UPDATE_MESSAGES, MessagingDispatcher.messagesUpdated

  unbindUpdateMessages: ->
    @channel.unbind @EVENT_UPDATE_MESSAGES, MessagingDispatcher.messagesUpdated