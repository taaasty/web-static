MessengerHeader = require '../common/header'

ConversationsHeader = React.createClass
  displayName: 'ConversationsHeader'

  render: ->
    <MessengerHeader title="Диалоги" />

module.exports = ConversationsHeader