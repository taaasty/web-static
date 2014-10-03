###* @jsx React.DOM ###

ERROR_STATE   = 'error'
SENT_STATE    = 'sent'
READ_STATE    = 'read'
SENDING_STATE = 'sending'

isElementInViewport = (el, parent) =>
  rect = el.getBoundingClientRect()

  return (
    rect.top    >= 0 &&
    rect.left   >= 0 &&
    rect.bottom <= (parent.innerHeight || document.documentElement.clientHeight) &&
    rect.right  <= (parent.innerWidth || document.documentElement.clientWidth)
  )

window.MessagesPopup_ThreadMessageListItemManager = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    message: React.PropTypes.object.isRequired

  getInitialState: ->
    @stateFromProps @props

  componentDidMount: ->
    if @isUnread() && @state.messageInfo.type is 'incoming'
      TastyEvents.on TastyEvents.keys.message_list_scrolled(), @handleMessageListScroll

    if @isErrorState()
      messagingService.addReconnectListener @resendMessage

  componentDidUpdate: ->
    if @isErrorState() && !@isReconnectListening
      messagingService.addReconnectListener @resendMessage

  componentWillReceiveProps: (nextProps) ->
    @setState @stateFromProps(nextProps)

  componentWillUnmount: ->
    TastyEvents.off TastyEvents.keys.message_list_scrolled(), @handleMessageListScroll
    messagingService.removeReconnectListener @resendMessage

  render: ->
   `<MessagesPopup_ThreadMessageListItem message={ this.props.message }
                                         messageInfo={ this.state.messageInfo }
                                         deliveryStatus={ this.state.currentState }
                                         onResendMessage={ this.resendMessage } />`

  activateSendingState: -> @setState(currentState: SENDING_STATE)
  activateErrorState:   -> @setState(currentState: ERROR_STATE)

  isErrorState: -> @state.currentState is ERROR_STATE

  isUnread: -> @props.message.read_at is null

  resendMessage: ->
    @activateSendingState()

    MessageActions.resendMessage {
      conversationId: @props.message.conversation_id
      content:        @props.message.content
      uuid:           @props.message.uuid
    }

  readMessage: ->
    MessageActions.readMessage @props.message.conversation_id, @props.message.id

  stateFromProps: (props) ->
    if props.message.sendingState?
      currentState = ERROR_STATE
    else if props.message.id
      currentState = if @isUnread() then SENT_STATE else READ_STATE
    else
      currentState = SENDING_STATE

    return {
      messageInfo: MessagesStore.getMessageInfo( props.message, props.message.conversation_id )
      currentState: currentState
    }

  handleMessageListScroll: (scrollerNode) ->
    messageNode = @getDOMNode()

    if isElementInViewport(messageNode, scrollerNode)
      @readMessage()
      TastyEvents.off TastyEvents.keys.message_list_scrolled(), @handleMessageListScroll