ConversationStore                 = require '../../stores/conversation'
ConnectStoreMixin                 = require '../../../../shared/react/mixins/connectStore'
MessengerHeader                   = require './common/header'
ConversationList                  = require './conversations/list'
MessengerCreateConversationButton = require './buttons/createConversation'
{ PropTypes } = React

MessengerConversations = React.createClass
  displayName: 'MessengerConversations'
  mixins: [ConnectStoreMixin(ConversationStore)]

  propTypes:
    onConversationClick: PropTypes.func.isRequired
    onCreateButtonClick: PropTypes.func.isRequired

  render: ->
    <div className="messages__section messages__section--dialogs">
      <MessengerHeader title="Диалоги" />
      <div className="messages__body">
        <ConversationList
            items={ @state.conversations }
            onItemClick={ @props.onConversationClick } />
      </div>
      <div className="messages__footer">
        <MessengerCreateConversationButton onClick={ @props.onCreateButtonClick } />
      </div>
    </div>

  getStateFromStore: ->
    conversations: ConversationStore.getAllChrono()

module.exports = MessengerConversations