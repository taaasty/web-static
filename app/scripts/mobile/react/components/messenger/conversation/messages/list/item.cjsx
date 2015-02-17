cx           = require 'react/lib/cx'
MessageStore = require '../../../../../stores/message'
UserAvatar   = require '../../../../common/avatar/user'
{ PropTypes } = React

MessageListItem = React.createClass
  displayName: 'MessageListItem'

  propTypes:
    item: PropTypes.object.isRequired

  getInitialState: ->
    itemInfo: MessageStore.getInfo @props.item.id, @props.item.conversation_id

  render: ->
    itemClasses = cx
      'message': true
      'message--to': @isIncoming()
      'message--from': @isOutgoing()

    return <div className={ itemClasses }>
             <div className="message__user-avatar">
               <UserAvatar
                   user={ @state.itemInfo.user }
                   size={ 42 } />
             </div>
             <div className="message__bubble">
               { @renderSlug() }
               <span className="messages__text"
                     dangerouslySetInnerHTML={{ __html: @props.item.content_html }} />
             </div>
             <div className="message__meta">
               { @renderMessageDate() }
             </div>
           </div>

  renderSlug: ->
    if @isIncoming()
      <span className="message__user-name">
        <a href={ @state.itemInfo.user.tlog_url }
           target="_blank">
          { @state.itemInfo.user.slug }
        </a>
      </span>
    else
      <span className="message__user-name">
        { @state.itemInfo.user.slug }
      </span>

  renderMessageDate: ->
    if @props.item.created_at
      date = moment( @props.item.created_at ).format 'D MMMM HH:mm'
      
      return <span className="message__date">
               { date }
             </span>

  isOutgoing: -> @state.itemInfo.type is 'outgoing'
  isIncoming: -> @state.itemInfo.type is 'incoming'

module.exports = MessageListItem