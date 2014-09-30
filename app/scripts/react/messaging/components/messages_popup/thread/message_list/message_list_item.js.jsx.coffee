###* @jsx React.DOM ###

window.MessagesPopup_ThreadMessageListItem = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    message:     React.PropTypes.object.isRequired
    messageInfo: React.PropTypes.object.isRequired

  render: ->
    deliveryStatus = @_getDeliveryStatus() if @isOutgoing()
    messageClasses = React.addons.classSet {
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
                { this._getMessageCreatedAt() }
                { deliveryStatus }
              </span>
            </div>`

  isUnread: -> @props.message.read_at is null

  isOutgoing: -> @props.messageInfo.type is 'outgoing'
  isIncoming: -> @props.messageInfo.type is 'incoming'

  _getDeliveryStatus: ->
    if @props.message.sendingState is 'error'
      deliveryClass = 'icon--refresh-2'
    else if @props.message.id
      deliveryClass = if @isUnread() then 'icon--tick' else 'icon--double-tick'

    return `<span className="message-delivery__status">
              <span className={ 'icon ' + deliveryClass } />
            </span>`

  _getMessageCreatedAt: ->
    moment( @props.message.created_at ).format 'D MMMM LT'