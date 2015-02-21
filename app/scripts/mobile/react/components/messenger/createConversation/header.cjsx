MessengerHeader = require '../common/header'

CreateConversationHeader = React.createClass
  displayName: 'CreateConversationHeader'

  render: ->
    <MessengerHeader title="Выбор получателя" />

module.exports = CreateConversationHeader