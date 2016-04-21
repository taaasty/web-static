ConversationStore           = require '../../stores/conversation'
ConnectStoreMixin           = require '../../../../shared/react/mixins/connectStore'
ComponentMixin              = require '../../mixins/component'
MessengerMixin              = require './mixins/messenger'
MessengerConversation       = require './conversation'
MessengerConversations      = require './MessengerConversations'
MessengerCreateConversation = require './createConversation'
{ PropTypes } = React

CONVERSATION_STATE        = 'conversation'
CONVERSATION_LIST_STATE   = 'conversationList'
CREATE_CONVERSATION_STATE = 'createConversation'

Messenger = React.createClass
  displayName: 'Messenger'
  mixins: [MessengerMixin, ComponentMixin]

  propTypes:
    state: PropTypes.string

  getDefaultProps: ->
    state: CONVERSATION_LIST_STATE

  getInitialState: ->
    currentState: @props.state

  render: ->
    content = switch @state.currentState
      when CONVERSATION_STATE
        <MessengerConversation />
      when CONVERSATION_LIST_STATE
        <MessengerConversations
            onConversationClick={ @openConversation }
            onCreateButtonClick={ @activateCreateState } />
      when CREATE_CONVERSATION_STATE
        <MessengerCreateConversation onCreate={ @createConversation } />
      else console.warn 'Unknown currentState of Messenger component', @state.currentState

    return <div className="messages messages--fixed">
             { content }
           </div>

  activateCreateState:           -> @safeUpdateState(currentState: CREATE_CONVERSATION_STATE)
  activateConversationState:     -> @safeUpdateState(currentState: CONVERSATION_STATE)
  activateConversationListState: -> @safeUpdateState(currentState: CONVERSATION_LIST_STATE)

module.exports = Messenger