###* @jsx React.DOM ###

window.MessagesPopup_ThreadMessageListItem = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    message: React.PropTypes.object.isRequired

  getInitialState: ->
    messageInfo: MessagesStore.getMessageInfo( @props.message, @props.message.conversation_id )

  componentDidMount: ->
    if @isUnread() && @state.messageInfo.type is 'incoming'
      MessageActions.readMessage @props.message.conversation_id, @props.message.id

  render: ->
    messageClasses = React.addons.classSet {
      'message': true
      'message--from': @state.messageInfo.type is 'outgoing'
      'message--to':   @state.messageInfo.type is 'incoming'
    }

    if @isOutgoing() && @props.message.id
      deliveryClass  = if @isUnread() then 'icon--tick' else 'icon--double-tick'
      deliveryStatus = `<span className="message-delivery__status">
                          <span className={ 'icon ' + deliveryClass } />
                        </span>`

    return `<div className={ messageClasses }>
              <span className="messages__user-avatar">
                <UserAvatar user={ this.state.messageInfo.user } size={ 35 } />
              </span>
              <div className="messages__bubble">
                <span className="messages__user-name">{ this.state.messageInfo.user.slug }</span> 
                <span dangerouslySetInnerHTML={{ __html: this.props.message.content_html }} />
              </div>
              <span className="messages__date">
                { this._getMessageCreatedAt() }
                { deliveryStatus }
              </span>
            </div>`

  isUnread: -> @props.message.read_at is null

  isOutgoing: -> @state.messageInfo.type is 'outgoing'
  isIncoming: -> @state.messageInfo.type is 'incoming'

  _getMessageCreatedAt: ->
    moment( @props.message.created_at ).format 'D MMMM LT'