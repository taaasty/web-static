Constants     = require '../../constants/constants'
AppDispatcher = require '../../dispatcher/dispatcher'

MessengerServerActions =

  createConversation: (conversation) ->
    AppDispatcher.handleServerAction
      type: Constants.messenger.CREATE_CONVERSATION
      conversation: conversation

  loadMessages: (messages) ->
    AppDispatcher.handleServerAction
      type: Constants.messenger.LOAD_MESSAGES
      messages: messages

  readMessages: (ids) ->
    AppDispatcher.handleServerAction
      type: Constants.messenger.READ_MESSAGES
      ids: ids

  createMessage: (message) ->
    AppDispatcher.handleServerAction
      type: Constants.messenger.CREATE_REMOTE_MESSAGE
      message: message

  createMessageFail: (uuid) ->
    AppDispatcher.handleServerAction
      type: Constants.messenger.CREATE_REMOTE_MESSAGE_FAIL
      uuid: uuid 

module.exports = MessengerServerActions