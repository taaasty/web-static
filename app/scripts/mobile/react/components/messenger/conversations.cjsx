ConversationStore        = require '../../stores/conversation'
ConnectStoreMixin        = require '../../../../shared/react/mixins/connectStore'
ConversationsHeader      = require './conversations/header'
ConversationList         = require './conversations/list'
CreateConversationButton = require './buttons/createConversation'
{ PropTypes } = React

MessengerConversations = React.createClass
  displayName: 'MessengerConversations'
  mixins: [ConnectStoreMixin(ConversationStore)]

  propTypes:
    onConversationClick: PropTypes.func.isRequired
    onCreateButtonClick: PropTypes.func.isRequired

  render: ->
    <div className="messages__section messages__section--dialogs">
      <ConversationsHeader />
      <div className="messages__body">
        <ConversationList
            items={ @state.conversations }
            onItemClick={ @props.onConversationClick } />
      </div>
      <div className="messages__footer">
        <CreateConversationButton onClick={ @props.onCreateButtonClick } />
      </div>
    </div>

  getStateFromStore: ->
    conversations: ConversationStore.getAllChrono()

module.exports = MessengerConversations