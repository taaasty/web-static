Api                    = require '../../api/api'
Constants              = require '../../constants/constants'
NotifyController       = require '../../controllers/notify'
AppDispatcher          = require '../../dispatcher/dispatcher'
MessengerServerActions = require '../server/messenger'
UuidService            = require '../../../../shared/react/services/uuid'

MessengerViewActions =

  createConversation: (userId) ->
    Api.messenger.createConversation userId
      .then (conversation) ->
        MessengerServerActions.createConversation conversation
        conversation

  openConversation: (convID) ->
    AppDispatcher.handleViewAction
      type: Constants.messenger.OPEN_CONVERSATION
      convID: convID

  loadMessages: (convID) ->
    Api.messenger.loadMessages convID
      .then (response) ->
        MessengerServerActions.loadMessages response.messages

  loadMoreMessages: (convID, toMsgID) ->
    Api.messenger.loadMessages convID, toMsgID
      .then (response) ->
        MessengerServerActions.loadMessages response.messages
        response

  readMessages: (convID, ids) ->
    Api.messenger.readMessages convID, ids
      .then (response) ->
        MessengerServerActions.readMessages ids

  createMessage: (convID, messageText) ->
    uuid = UuidService.generate()

    AppDispatcher.handleViewAction
      type: Constants.messenger.CREATE_LOCAL_MESSAGE
      convID: convID
      messageText: messageText
      uuid: uuid

    Api.messenger.createMessage convID, messageText, uuid
      .then (message) ->
        MessengerServerActions.createMessage message
      .fail ->
        NotifyController.notifyError i18n.t('messages.messenger_create_message_error')
        MessengerServerActions.createMessageFail uuid

  recreateMessage: (convID, messageText, uuid) ->
    Api.messenger.createMessage convID, messageText, uuid
      .then (message) ->
        MessengerServerActions.createMessage message
      .fail ->
        NotifyController.notifyError i18n.t('messages.messenger_recreate_message_error')
        MessengerServerActions.createMessageFail uuid

module.exports = MessengerViewActions