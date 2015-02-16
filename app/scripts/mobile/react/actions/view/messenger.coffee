Api = require '../../api/api'

MessengerViewActions =

  createConversation: (id) ->
    Api.messenger.createConversation id

module.exports = MessengerViewActions