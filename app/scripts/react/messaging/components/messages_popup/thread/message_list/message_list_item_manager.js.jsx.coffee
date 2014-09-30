###* @jsx React.DOM ###

window.MessagesPopup_ThreadMessageListItemManager = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    message: React.PropTypes.object.isRequired

  getInitialState: ->
    messageInfo: MessagesStore.getMessageInfo( @props.message, @props.message.conversation_id )

  componentDidMount: ->
    if @isUnread() && @state.messageInfo.type is 'incoming'
      MessageActions.readMessage @props.message.conversation_id, @props.message.id

  render: ->
   `<MessagesPopup_ThreadMessageListItem message={ this.props.message }
                                         messageInfo={ this.state.messageInfo } />`

  isUnread: -> @props.message.read_at is null