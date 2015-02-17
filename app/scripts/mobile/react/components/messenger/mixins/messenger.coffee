MessengerViewActions = require '../../../actions/view/messenger'

MessengerMixin =

  createConversation: (id) ->
    MessengerViewActions.createConversation id
      .then @activateConversationState

  openConversation: (id) ->
    MessengerViewActions.openConversation id
    @activateConversationState()

module.exports = MessengerMixin