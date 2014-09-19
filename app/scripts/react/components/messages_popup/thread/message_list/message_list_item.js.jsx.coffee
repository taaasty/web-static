###* @jsx React.DOM ###

window.MessagesPopup_ThreadMessageListItem = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    message:        React.PropTypes.object.isRequired
    conversationId: React.PropTypes.number.isRequired

  getInitialState: ->
    messageInfo: ConversationsStore.getMessageInfo( @props.conversationId, @props.message.id )

  render: ->
    messageClasses = React.addons.classSet {
      'message': true
      'message--from': @state.messageInfo.type is 'outgoing'
      'message--to':   @state.messageInfo.type is 'incoming'
    }

    return `<div className={ messageClasses }>
              <span className="messages__user-avatar">
                <UserAvatar user={ this.state.messageInfo.user } size={ 35 } />
              </span>
              <div className="messages__bubble">
                <span className="messages__user-name">{ this.state.messageInfo.user.slug }</span> 
                <span dangerouslySetInnerHTML={{ __html: this.props.message.content_html }} />
              </div>
              <span className="messages__date">{ this.timeAgo( this.props.message.created_at) }</span>
            </div>`