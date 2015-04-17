classnames = require 'classnames'

ERROR_STATE   = 'error'
SENT_STATE    = 'sent'
READ_STATE    = 'read'
SENDING_STATE = 'sending'

window.MessagesPopup_ThreadMessageListItem = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    message:         React.PropTypes.object.isRequired
    messageInfo:     React.PropTypes.object.isRequired
    onResendMessage: React.PropTypes.func.isRequired

  render: ->
    messageClasses = classnames('message', {
      'message--from': @props.messageInfo.type is 'outgoing'
      'message--to':   @props.messageInfo.type is 'incoming'
    })

    deliveryStatus   = @_getDeliveryStatus() if @isOutgoing()
    messageCreatedAt = @_getMessageCreatedAt() if @props.message.created_at

    if @isIncoming()
      userSlug = <span className="messages__user-name">
                   <a href={ this.props.messageInfo.user.tlog_url }
                      target="_blank">
                     { this.props.messageInfo.user.slug }
                   </a>
                 </span>
    else
      userSlug = <span className="messages__user-name">{ this.props.messageInfo.user.slug }</span>

    return <div className={ messageClasses }>
             <span className="messages__user-avatar">
               <UserAvatar user={ this.props.messageInfo.user } size={ 35 } />
             </span>
             <div className="messages__bubble">
               { userSlug }
               <span className="messages__text"
                     dangerouslySetInnerHTML={{__html: this.props.message.content_html || ''}} />
             </div>
             <span className="messages__date">
               { messageCreatedAt }
               { deliveryStatus }
             </span>
           </div>

  isUnread: -> @props.message.read_at is null

  isOutgoing: -> @props.messageInfo.type is 'outgoing'
  isIncoming: -> @props.messageInfo.type is 'incoming'

  _getDeliveryStatus: ->
    switch @props.deliveryStatus
      when ERROR_STATE
        deliveryClass = 'icon--refresh'
        onClick = => @props.onResendMessage()
      when SENT_STATE then deliveryClass = 'icon--tick'
      when READ_STATE then deliveryClass = 'icon--double-tick'
      # when SENDING_STATE then ...

    return <span className="message-delivery__status"
                 onClick={ onClick }>
             <span className={ 'icon ' + deliveryClass } />
           </span>

  _getMessageCreatedAt: ->
    moment( @props.message.created_at ).format 'D MMMM HH:mm'