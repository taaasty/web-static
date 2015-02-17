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

module.exports = MessengerServerActions