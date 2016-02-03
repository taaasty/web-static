React = require 'react';
{ render, unmountComponentAtNode } = require 'react-dom';

MessagingDispatcher = require './MessagingDispatcher';
MessagesPopup = require './components/messages_popup';

PUBLIC_CONVERSATION_PREFIX = 'public_';

class window.MessagingService
  EVENT_STATUS: 'status'
  EVENT_UPDATE_CONVERSATION:  'update_conversation'
  EVENT_PUSH_MESSAGE:         'push_message'
  EVENT_PUSH_NOTIFICATION:    'push_notification'
  EVENT_UPDATE_MESSAGES:      'update_messages'
  EVENT_UPDATE_NOTIFICATIONS: 'update_notifications'
  EVENT_DELETE_MESSAGES:      'delete_messages'
  EVENT_DELETE_USER_MESSAGES: 'delete_user_messages'
  RECONNECT_EVENT:            'reconnected'

  CHANNEL_MAIN: (userId) -> "private-#{ userId }-messaging"

  constructor: ({ @user }) ->
    MessagingDispatcher.changeConnectionState ConnectionStateStore.PROCESS_STATE

    _.extend @, EventEmitter.prototype

    @pusher = new Pusher gon.pusher.key,
      authEndpoint: ApiRoutes.pusher_auth_url()
      pong_timeout: 6000
      unavailable_timeout: 2000
      auth:
        headers:
          'X-User-Token': @user.api_key.access_token

    @channel = @pusher.subscribe @CHANNEL_MAIN(@user.id)
    @channel.bind 'pusher:subscription_succeeded', @_connected
    @channel.bind 'pusher:subscription_error', (error) ->
      NoticeService.notify 'error', i18n.t 'pusher_subscription_error'
      MessagingDispatcher.changeConnectionState ConnectionStateStore.ERROR_STATE

    @channel.bind_all((_type='', data) =>
      type = _type.replace(/^(public_|group_)/, '')
      switch type
        when @EVENT_STATUS then MessagingDispatcher.updateMessagingStatus(data)
        when @EVENT_UPDATE_CONVERSATION then MessagingDispatcher.updateConversation(data)
        when @EVENT_PUSH_MESSAGE then MessagingDispatcher.messageReceived(data)
        when @EVENT_UPDATE_MESSAGES then MessagingDispatcher.messagesUpdated(data)
        when @EVENT_PUSH_NOTIFICATION then MessagingDispatcher.notificationReceived(data)
        when @EVENT_UPDATE_NOTIFICATIONS then MessagingDispatcher.notificationsUpdated(data)
        when @EVENT_DELETE_MESSAGES then MessagingDispatcher.deleteMessages(data)
        when @EVENT_DELETE_USER_MESSAGES then MessagingDispatcher.deleteUserMessages(data)
    )

    #@channel.bind @EVENT_STATUS, MessagingDispatcher.updateMessagingStatus
    #@channel.bind @EVENT_UPDATE_CONVERSATION, MessagingDispatcher.updateConversation
    #@channel.bind @EVENT_PUSH_MESSAGE, MessagingDispatcher.messageReceived
    #@channel.bind @EVENT_UPDATE_MESSAGES, MessagingDispatcher.messagesUpdated
    #@channel.bind @EVENT_PUSH_NOTIFICATION, MessagingDispatcher.notificationReceived
    #@channel.bind @EVENT_UPDATE_NOTIFICATIONS, MessagingDispatcher.notificationsUpdated

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
          notifications: data.notifications
        }
      error: (error) -> console.error? "Error", error

    @pusher.connection.bind 'unavailable', (error) -> console.log "pusher unavailable", error
    @pusher.connection.bind 'failed',      (error) -> console.log "pusher failer", error
    @pusher.connection.bind 'connected', @emitReconnect

  emitReconnect: =>
    @emit @RECONNECT_EVENT

  postNewConversation: ({recipientId, error}) ->
    @requester.postNewConversation(recipientId)
      .done (conversation) ->
        MessagingDispatcher.handleServerAction
          type: 'postNewConversation'
          conversation: conversation
      .fail (errMsg) ->
        error?()
        NoticeService.errorResponse errMsg

  deleteConversation: (conversationId) ->
    this.requester.deleteConversation(conversationId)
      .done((data) ->
        MessagingDispatcher.handleServerAction({
          type: 'deleteConversation',
          id: conversationId,
        });
        NoticeService.notifySuccess(i18n.t('messenger.request.conversation_delete_success'))
        return data;
      )
      .fail((err) -> NoticeService.errorResponse(err))

  deleteMessages: (conversationId, msgIds, all=false) ->
    this.requester.deleteMessages(conversationId, msgIds, all)
      .done((data) ->
        return data;
      )
      .fail((err) -> NoticeService.errorResponse(err))

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

  postMessage: ({ conversationId, content, files, uuid }) ->
    @requester.postMessage(conversationId, content, files, uuid)
      .done (message) ->
        MessagingDispatcher.messageReceived message
        if window.ga
          window.ga('send', 'event', 'UX', 'SendMessage')
      .fail (errMsg) ->
        MessagingDispatcher.handleServerAction {
          type: 'messageSendingError'
          conversationId: conversationId
          uuid: uuid
        }
        NoticeService.errorResponse errMsg

  markAsReadMessage: (conversationId, messageId) ->
    @requester.markAsReadMessage(conversationId, messageId)
      .fail (errMsg) ->
        console.error 'Проблема при прочтении сообщения', errMsg

  markAsReadNotification: (notificationId) ->
    @requester.markAsReadNotification(notificationId)
      .fail (errMsg) ->
        console.error 'Проблема при прочтении уведомления', errMsg

  isMessagesPopupShown:      -> @messagesPopup?.isMounted()
  isNotificationsPopupShown: -> @notificationsPopup?.isMounted()

  closeMessagesPopup: ->
    if @isMessagesPopupShown()
      unmountComponentAtNode @messagesContainer
    return

  closeNotificationsPopup: ->
    if @isNotificationsPopupShown()
      unmountComponentAtNode @notificationsContainer
    return

  openMessagesPopup: ->
    unless @isMessagesPopupShown()
      @messagesPopup = render <MessagesPopup />, @messagesContainer
    return

  openNotificationsPopup: ->
    unless @isNotificationsPopupShown()
      @notificationsPopup = render <NotificationsPopup />, @notificationsContainer
    return

  toggleMessagesPopup: ->
    if @isMessagesPopupShown() then @closeMessagesPopup() else @openMessagesPopup()

  toggleNotificationsPopup: ->
    if @isNotificationsPopupShown() then @closeNotificationsPopup() else @openNotificationsPopup()

  addReconnectListener: (callback) ->
    @on @RECONNECT_EVENT, callback

  removeReconnectListener: (callback) ->
    @off @RECONNECT_EVENT, callback

  unbindPushMessages: ->
    @channel.unbind @EVENT_PUSH_MESSAGE, MessagingDispatcher.messageReceived

  unbindUpdateMessages: ->
    @channel.unbind @EVENT_UPDATE_MESSAGES, MessagingDispatcher.messagesUpdated

  unbindPushNotifications: ->
    @channel.unbind @EVENT_PUSH_NOTIFICATION, MessagingDispatcher.notificationReceived

  unbindUpdateNotifications: ->
    @channel.unbind @EVENT_UPDATE_NOTIFICATIONS, MessagingDispatcher.notificationsUpdated
