UserAvatar = require '../../../common/avatar/user'
{ PropTypes } = React

ConversationListItem = React.createClass
  displayName: 'ConversationListItem'

  propTypes:
    item:    PropTypes.object.isRequired
    onClick: PropTypes.func.isRequired

  render: ->
    <div className="messages__dialog"
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
      { @renderDate() }
    </div>

  renderLastMessageText: ->
    text = @props.item.last_message?.content_html

    return <span dangerouslySetInnerHTML={{ __html: text }} />

  renderDate: ->
    date = if @props.item.last_message? then @lastMessageCreatedAt() else @lastConversationCreatedAt()

    return <span className="messages__date">
             { date }
           </span>

  lastMessageCreatedAt: ->
    moment( @props.item.last_message.created_at ).format 'D MMMM HH:mm'

  lastConversationCreatedAt: ->
    moment( @props.item.created_at ).format 'D MMMM HH:mm'

  handleClick: ->
    @props.onClick @props.item.id

module.exports = ConversationListItem