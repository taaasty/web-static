ConversationStore           = require '../../stores/conversation'
ConnectStoreMixin           = require '../../../../shared/react/mixins/connectStore'
ComponentMixin              = require '../../mixins/component'
MessengerMixin              = require './mixins/messenger'
MessengerConversation       = require './conversation'
MessengerConversations      = require './conversations'
MessengerCreateConversation = require './createConversation'
{ PropTypes } = React

CONVERSATION_STATE        = 'conversation'
CONVERSATION_LIST_STATE   = 'conversationList'
CREATE_CONVERSATION_STATE = 'createConversation'

Messenger = React.createClass
  displayName: 'Messenger'
  mixins: [ConnectStoreMixin(ConversationStore), MessengerMixin, ComponentMixin]

  propTypes:
    state:          PropTypes.string
    conversationId: PropTypes.number

  getDefaultProps: ->
    state:          CREATE_CONVERSATION_STATE
    conversationId: null

  getInitialState: ->
    currentState:   @props.state
    conversationId: @props.conversationId

  render: ->
    content = switch @state.currentState
      when CONVERSATION_STATE
        <MessengerConversation id={ @state.conversationId } />
      when CONVERSATION_LIST_STATE
        <MessengerConversations
            conversations={ @state.conversations }
            onCreateButtonClick={ @activateCreateState } />
      when CREATE_CONVERSATION_STATE
        <MessengerCreateConversation onCreate={ @createConversation } />
      else console.warn 'Unknown currentState of Messenger component', @state.currentState

    return <div className="messages">
             { content }
           </div>

  activateCreateState:       -> @setState(currentState: CREATE_CONVERSATION_STATE)
  activateConversationState: -> @setState(currentState: CONVERSATION_STATE)

  getStateFromStore: ->
    conversations: ConversationStore.getAll()

module.exports = Messenger