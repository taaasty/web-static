MessengerHeader = require '../common/header'
{ PropTypes } = React

ConversationHeader = React.createClass
  displayName: 'ConversationHeader'

  propTypes:
    slug: PropTypes.string.isRequired

  render: ->
    <MessengerHeader title={ @getTitle() } />

  getTitle: ->
    #TODO: i18n key like "Переписка с __userSlug__", {userSlug: 'Tasty'}
    'Переписка с ' + @props.slug

module.exports = ConversationHeader