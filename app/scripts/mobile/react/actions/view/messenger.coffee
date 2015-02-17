Api                    = require '../../api/api'
Constants              = require '../../constants/constants'
AppDispatcher          = require '../../dispatcher/dispatcher'
MessengerServerActions = require '../server/messenger'

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

  loadMessages: (convId) ->
    Api.messenger.loadMessages convId
      .then (response) ->
        MessengerServerActions.loadMessages response.messages

module.exports = MessengerViewActions