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
    @channel.bind Constants.messaging.CONNECT_SUCCESS, @onConnectionSuccess
    @channel.bind Constants.messaging.CONNECT_FAIL, @onConnectionFail
    @channel.bind Constants.messaging.UPDATE_STATUS, @onUpdateStatus
    @channel.bind Constants.messaging.UPDATE_CONVERSATION, @onUpdateConversation
    @channel.bind Constants.messaging.PUSH_MESSAGE, @onPushMessage
    @channel.bind Constants.messaging.UPDATE_MESSAGES, @onUpdateMessages
    @channel.bind Constants.messaging.PUSH_NOTIFICATION, @onPushNotification
    @channel.bind Constants.messaging.UPDATE_NOTIFICATIONS, @onUpdateNotifications

  onConnectionSuccess: =>
    Api.messaging.ready @pusher.connection.socket_id
      .then ->
        console.log 'Welcome to the Matrix, Neo'

  onConnectionFail: ->
    NotifyController.notifyError 'Соединение не установлено'

  onUpdateStatus: (status) ->
    console.log 'onUpdateStatus', status
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

  onPushNotification: (notification) ->
    AppDispatcher.handleServerAction
      type: Constants.messaging.PUSH_NOTIFICATION
      notification: notification

  onUpdateNotifications: (data) ->
    AppDispatcher.handleServerAction
      type: Constants.messaging.UPDATE_NOTIFICATIONS
      notifications: data.notifications

module.exports = MessagingService