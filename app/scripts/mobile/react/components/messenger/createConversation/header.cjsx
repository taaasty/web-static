MessengerHeader = require '../common/header'

CreateConversationHeader = React.createClass
  displayName: 'CreateConversationHeader'

  render: ->
    <MessengerHeader title={ i18n.t('messenger.create_conversation_header') } />

module.exports = CreateConversationHeader