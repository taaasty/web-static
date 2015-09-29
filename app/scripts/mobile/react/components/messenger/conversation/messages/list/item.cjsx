classnames = require 'classnames'
UserAvatar = require '../../../../common/avatar/user'
Image = require '../../../../../../../shared/react/components/common/Image'
{ PropTypes } = React

ERROR_STATE   = 'error'
SENT_STATE    = 'sent'
READ_STATE    = 'read'
SENDING_STATE = 'sending'

MessageListItem = React.createClass
  displayName: 'MessageListItem'

  propTypes:
    item:            PropTypes.object.isRequired
    itemInfo:        PropTypes.object.isRequired
    deliveryStatus:  PropTypes.string.isRequired
    onResendMessage: PropTypes.func.isRequired

  render: ->
    itemClasses = classnames('message', {
      'message--to': @isIncoming()
      'message--from': @isOutgoing()
      'message--error': @isErrorStatus()
    })

    return <div className={ itemClasses }
                onClick={ @handleClick }>
             <div className="message__user-avatar">
               <UserAvatar
                   user={ @props.itemInfo.user }
                   size={ 42 } />
             </div>
             <div className="message__bubble">
               { @renderSlug() }
               <span className="message__text"
                     dangerouslySetInnerHTML={{ __html: @props.item.content_html || ''}} />
               <div className="message__img-container">
                 { @renderAttachments() }
               </div>
             </div>
             <div className="message__meta">
               { @renderMessageDate() }
               { @renderDeliveryStatus() }
             </div>
           </div>

  renderSlug: ->
    if @isIncoming()
      <span className="message__user-name">
        <a href={ @props.itemInfo.user.tlog_url }
           target="_blank">
          { @props.itemInfo.user.slug }
        </a>
      </span>
    else
      <span className="message__user-name">
        { @props.itemInfo.user.slug }
      </span>

  renderAttachments: ->
    if @props.item.attachments and @props.item.attachments.length
      @props.item.attachments.map((img) ->
        <div className="message__img">
          <a href={img.url} target="_blank">
            <Image image={img} isRawUrl={true} />
          </a>
        </div>
      )
    else
      null

  renderMessageDate: ->
    if @props.item.created_at
      date = moment( @props.item.created_at ).format 'D MMMM HH:mm'
      
      return <span className="message__date">
               { date }
             </span>

  renderDeliveryStatus: ->
    if @isOutgoing()
      statusClass = switch @props.deliveryStatus
        when SENT_STATE  then 'icon--tick'
        when READ_STATE  then 'icon--double-tick'
        when ERROR_STATE then 'icon--refresh'
        else ''

      return <span className="message__delivery-status">
               <i className={ "icon " + statusClass } />
             </span>

  isErrorStatus: -> @props.deliveryStatus is ERROR_STATE

  isOutgoing: -> @props.itemInfo.type is 'outgoing'
  isIncoming: -> @props.itemInfo.type is 'incoming'

  handleClick: ->
    @props.onResendMessage() if @isErrorStatus()

module.exports = MessageListItem
