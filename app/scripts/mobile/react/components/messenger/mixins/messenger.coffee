MessengerViewActions = require '../../../actions/view/messenger'

CONVERSATION_STATE        = 'conversation'
CONVERSATION_LIST_STATE   = 'conversationList'
CREATE_CONVERSATION_STATE = 'createConversation'

MessengerMixin =

  createConversation: (id) ->
    MessengerViewActions.createConversation id
      .then (conversation) =>
        @safeUpdateState
          conversationId: id
          currentState: CONVERSATION_STATE

module.exports = MessengerMixin