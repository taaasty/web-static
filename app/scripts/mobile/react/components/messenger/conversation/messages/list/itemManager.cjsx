MessageStore         = require '../../../../../stores/message'
MessengerViewActions = require '../../../../../actions/view/messenger'
MessageListItem      = require './item'
{ PropTypes } = React

ERROR_STATE   = 'error'
SENT_STATE    = 'sent'
READ_STATE    = 'read'
SENDING_STATE = 'sending'

MessageListItemManager = React.createClass
  displayName: 'MessageListItemManager'

  propTypes:
    item: PropTypes.object.isRequired

  getInitialState: ->
    @getStateFromProps @props

  componentWillReceiveProps: (nextProps) ->
    @setState @getStateFromProps(nextProps)

  render: ->
    <MessageListItem
        item={ @props.item }
        itemInfo={ @state.itemInfo }
        deliveryStatus={ @state.currentState }
        onResendMessage={ @resendMessage } />

  activateSendingState: -> @setState(currentState: SENDING_STATE)

  resendMessage: ->
    { conversation_id, content_html, uuid } = @props.item

    @activateSendingState()
    MessengerViewActions.recreateMessage conversation_id, content_html, uuid

  getStateFromProps: (props) ->
    if props.item.sendingError
      currentState = ERROR_STATE
    else if props.item.id
      currentState = if props.item.read_at is null then SENT_STATE else READ_STATE
    else
      currentState = SENDING_STATE

    return {
      currentState: currentState
      itemInfo: MessageStore.getInfo props.item, props.item.conversation_id
    }

module.exports = MessageListItemManager