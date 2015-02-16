MessengerHeader                   = require './common/header'
MessengerConversationList         = require './conversations/list'
MessengerCreateConversationButton = require './buttons/createConversation'
{ PropTypes } = React

MessengerConversations = React.createClass
  displayName: 'MessengerConversations'

  propTypes:
    conversations:       PropTypes.array.isRequired
    onCreateButtonClick: PropTypes.func.isRequired

  render: ->
    <div className="messages__section messages__section--dialogs">
      <MessengerHeader title="Диалоги" />
      <div className="messages__body">
        <MessengerConversationList items={ @props.conversations } />
      </div>
      <div className="messages__footer">
        <MessengerCreateConversationButton onClick={ @props.onCreateButtonClick } />
      </div>
    </div>

module.exports = MessengerConversations