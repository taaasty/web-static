cx = require 'react/lib/cx'

window.MessagesPopup_ConversationsListItem = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    conversation: React.PropTypes.object.isRequired

  render: ->
    online = <span className="messages__user-online" /> if @props.conversation.online

    listItemClasses = cx
      'messages__dialog': true
      'state--read': !@hasUnreadMessages()

    if @props.conversation.last_message?
      lastMessageText = <span dangerouslySetInnerHTML={{ __html: this._getLastMessageText() }} />
      lastCreatedAt   = @_getLastMessageCreatedAt()
    else
      lastCreatedAt   = @_getLastConversationCreatedAt()

    return <div className={ listItemClasses }
                onClick={ this.handleClick }>
             { this._getMessagesIndicator() }

             <span className="messages__user-avatar">
               <UserAvatar user={ this.props.conversation.recipient } size={ 35 } />
               { online }
             </span>

             <div className="messages__dialog-text">
               <span className="messages__user-name">{ this.props.conversation.recipient.slug }</span>
               { lastMessageText }
             </div>
             <span className="messages__date">{ lastCreatedAt }</span>
           </div>

  hasUnreadMessages:     -> @props.conversation.unread_messages_count > 0
  hasUnreceivedMessages: -> @props.conversation.unreceived_messages_count > 0

  _getMessagesIndicator: ->
    if @hasUnreadMessages()
      return <div className="unread-messages__counter">
               { this.props.conversation.unread_messages_count }
             </div>
    else if @hasUnreceivedMessages()
      return <div className="unreceived-messages__counter" />

  _getUnreadMessagesCount: ->
    if @hasUnreadMessages()
      <div className="messages__counter">{ this.props.conversation.unread_messages_count }</div>

  _getLastMessageText: ->
    @props.conversation.last_message.content_html

  _getLastMessageCreatedAt: ->
    moment( @props.conversation.last_message.created_at ).format 'D MMMM HH:mm'

  _getLastConversationCreatedAt: ->
    moment( @props.conversation.created_at ).format 'D MMMM HH:mm'

  handleClick: ->
    ConversationActions.clickConversation @props.conversation.id