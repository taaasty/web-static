###* @jsx React.DOM ###

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
    deliveryStatus   = @_getDeliveryStatus() if @isOutgoing()
    messageCreatedAt = @_getMessageCreatedAt() if @props.message.created_at
    messageClasses   = React.addons.classSet {
      'message': true
      'message--from': @props.messageInfo.type is 'outgoing'
      'message--to':   @props.messageInfo.type is 'incoming'
    }

    return `<div className={ messageClasses }>
              <span className="messages__user-avatar">
                <UserAvatar user={ this.props.messageInfo.user } size={ 35 } />
              </span>
              <div className="messages__bubble">
                <span className="messages__user-name">{ this.props.messageInfo.user.slug }</span> 
                <span dangerouslySetInnerHTML={{ __html: this.props.message.content_html }} />
              </div>
              <span className="messages__date">
                { messageCreatedAt }
                { deliveryStatus }
              </span>
            </div>`

  isUnread: -> @props.message.read_at is null

  isOutgoing: -> @props.messageInfo.type is 'outgoing'
  isIncoming: -> @props.messageInfo.type is 'incoming'

  _getDeliveryStatus: ->
    switch @props.deliveryStatus
      when ERROR_STATE
        deliveryClass = 'icon--refresh-2'
        onClick = => @props.onResendMessage()
      when SENT_STATE then deliveryClass = 'icon--tick'
      when READ_STATE then deliveryClass = 'icon--double-tick'
      # when SENDING_STATE then ...

    return `<span className="message-delivery__status"
                  onClick={ onClick }>
              <span className={ 'icon ' + deliveryClass } />
            </span>`

  _getMessageCreatedAt: ->
    moment( @props.message.created_at ).format 'D MMMM LT'