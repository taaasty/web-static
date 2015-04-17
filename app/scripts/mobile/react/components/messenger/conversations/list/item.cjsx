classnames = require 'classnames'
UserAvatar = require '../../../common/avatar/user'
{ PropTypes } = React

ConversationListItem = React.createClass
  displayName: 'ConversationListItem'

  propTypes:
    item:    PropTypes.object.isRequired
    onClick: PropTypes.func.isRequired

  render: ->
    itemClasses = classnames('messages__dialog', {
      '__read': !@hasUnreadMessages()
    })

    return <div className={ itemClasses }
                onClick={ @handleClick }>
             <div className="messages__user-avatar">
               <UserAvatar
                   user={ @props.item.recipient }
                   size={ 42 } />
             </div>
             <div className="messages__dialog-text">
               <span className="messages__user-name">
                 { @props.item.recipient.slug } 
               </span>
               { @renderLastMessageText() }
             </div>
             { @renderCounter() }
             { @renderDate() }
           </div>

  renderLastMessageText: ->
    text = @props.item.last_message?.content_html

    return <span dangerouslySetInnerHTML={{ __html: text || ''}} />

  renderDate: ->
    date = if @props.item.last_message? then @lastMessageCreatedAt() else @lastConversationCreatedAt()

    return <span className="messages__date">
             { date }
           </span>

  renderCounter: ->
    switch
      when @hasUnreadMessages()
        <div className="unread-messages__counter">
          { @props.item.unread_messages_count }
        </div>
      when @hasUnreceivedMessages()
        <div className="unreceived-messages__counter" />
      else null

  hasUnreadMessages: ->
    @props.item.unread_messages_count > 0

  hasUnreceivedMessages: ->
    @props.item.unreceived_messages_count > 0

  lastMessageCreatedAt: ->
    moment( @props.item.last_message.created_at ).format 'D MMMM HH:mm'

  lastConversationCreatedAt: ->
    moment( @props.item.created_at ).format 'D MMMM HH:mm'

  handleClick: ->
    @props.onClick @props.item.id

module.exports = ConversationListItem