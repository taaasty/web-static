Constants        = require '../constants/constants'
NotifyController = require '../controllers/notify'
AppDispatcher    = require '../dispatcher/dispatcher'
Api = require '../api/api'

class MessagingService extends EventEmitter
  userID:    null
  userToken: null
  pusher:    null
  channel:   null

  constructor: (userID, userToken) ->
    @userID    = userID
    @userToken = userToken

    pusherOptions =
      authEndpoint: ApiRoutes.pusher_auth_url()
      pong_timeout: 6000
      unavailable_timeout: 2000
      auth: headers: 'X-User-Token': @userToken

    @pusher = new Pusher gon.pusher.key, pusherOptions
    @makeSubscriptions()

  makeSubscriptions: ->
    @channel = @pusher.subscribe "private-#{ @userID }-messaging"

    this.channel.bind_all((_type='', data) =>
      type = _type.replace(/^(public_|group_)/, '');

      switch type
        when Constants.messaging.CONNECT_SUCCESS then @onConnectionSuccess(data)
        when Constants.messaging.CONNECT_FAIL then @onConnectionFail(data)
        when Constants.messaging.UPDATE_STATUS then @onUpdateStatus(data)
        when Constants.messaging.UPDATE_CONVERSATION then @onUpdateConversation(data)
        when Constants.messaging.PUSH_MESSAGE then @onPushMessage(data)
        when Constants.messaging.UPDATE_MESSAGES then @onUpdateMessages(data)
        when Constants.messaging.PUSH_NOTIFICATION then @onPushNotification(data)
        when Constants.messaging.UPDATE_NOTIFICATIONS then @onUpdateNotifications(data)
        when Constants.messaging.DELETE_MESSAGES then this.onDeleteMessages(data)
        when Constants.messaging.DELETE_USER_MESSAGES then this.onDeleteUserMessages(data)
  )

  onConnectionSuccess: =>
    Api.messaging.ready @pusher.connection.socket_id
      .then ({ conversations, notifications }) ->
        ###
        AppDispatcher.handleServerAction({
          type: Constants.messenger.INIT_CONVERSATIONS,
          conversations,
        });
        ###
        console.log 'Welcome to the Matrix, Neo'

  onConnectionFail: ->
    NotifyController.notifyError i18n.t('messages.messenger_connection_error')

  onUpdateStatus: (status) ->
    AppDispatcher.handleServerAction
      type: Constants.messaging.UPDATE_STATUS
      status: status

  onUpdateConversation: (conversation) ->
    AppDispatcher.handleServerAction
      type: Constants.messaging.UPDATE_CONVERSATION
      conversation: conversation

  onPushMessage: (message) ->
    AppDispatcher.handleServerAction
      type: Constants.messaging.PUSH_MESSAGE
      message: message

  onUpdateMessages: (data) ->
    AppDispatcher.handleServerAction
      type: Constants.messaging.UPDATE_MESSAGES
      messages: data.messages

  onDeleteMessages: ({ messages }) ->
    AppDispatcher.handleServerAction({
      type: Constants.messaging.DELETE_MESSAGES,
      messages,
    });

  onDeleteUserMessages: ({ messages }) ->
    AppDispatcher.handleServerAction({
      type: Constants.messaging.DELETE_USER_MESSAGES,
      messages,
    });

  onPushNotification: (notification) ->
    AppDispatcher.handleServerAction
      type: Constants.messaging.PUSH_NOTIFICATION
      notification: notification

  onUpdateNotifications: (data) ->
    AppDispatcher.handleServerAction
      type: Constants.messaging.UPDATE_NOTIFICATIONS
      notifications: data.notifications

module.exports = MessagingService
