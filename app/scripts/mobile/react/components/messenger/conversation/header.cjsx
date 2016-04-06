MessengerHeader = require '../MessengerHeader'
{ PropTypes } = React

ConversationHeader = React.createClass
  displayName: 'ConversationHeader'

  propTypes:
    slug: PropTypes.string.isRequired

  render: ->
    <MessengerHeader title={ i18n.t('messenger.conversation_header', {userSlug: @props.slug}) } />

module.exports = ConversationHeader