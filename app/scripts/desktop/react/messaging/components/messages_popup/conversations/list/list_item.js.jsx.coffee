###* @jsx React.DOM ###

window.MessagesPopup_ConversationsListItem = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    conversation: React.PropTypes.object.isRequired

  render: ->
    online = `<span className="messages__user-online" />` if @props.conversation.online

    listItemClasses = React.addons.classSet {
      'messages__dialog': true
      'state--read': !@hasUnreadMessages()
    }

    if @props.conversation.last_message?
      lastMessageText = `<span dangerouslySetInnerHTML={{ __html: this._getLastMessageText() }} />`
      lastCreatedAt   = @_getLastMessageCreatedAt()
    else
      lastCreatedAt   = @_getLastConversationCreatedAt()

    return `<div className={ listItemClasses }
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
            </div>`

  hasUnreadMessages:     -> @props.conversation.unread_messages_count > 0
  hasUnreceivedMessages: -> @props.conversation.unreceived_messages_count > 0

  _getMessagesIndicator: ->
    if @hasUnreadMessages()
      return `<div className="unread-messages__counter">
               { this.props.conversation.unread_messages_count }
              </div>`
    else if @hasUnreceivedMessages()
      return `<div className="unreceived-messages__counter" />`

  _getUnreadMessagesCount: ->
    if @hasUnreadMessages()
      `<div className="messages__counter">{ this.props.conversation.unread_messages_count }</div>`

  _getLastMessageText: ->
    @props.conversation.last_message.content_html

  _getLastMessageCreatedAt: ->
    moment( @props.conversation.last_message.created_at ).format 'D MMMM HH:mm'

  _getLastConversationCreatedAt: ->
    moment( @props.conversation.created_at ).format 'D MMMM HH:mm'

  handleClick: ->
    ConversationActions.clickConversation @props.conversation.id

# <div data-id="2"
#            className="messages__dialog js-messages-dialog">
#         <div className="messages__counter">+1</div>
#         <span className="messages__user-avatar">
#           <span className="avatar avatar--second">
#             <span className="avatar__text">2</span>
#           </span>
#         </span>
#         <div className="messages__dialog-text">
#           <span className="messages__user-name">2crabs</span> Еще Шпенглер в "Закате Европы" писал, что капиталистическое…
#         </div>
#         <span className="messages__date">Сегодня в 18:43</span>
#       </div>
#       <div data-id="3"
#            className="messages__dialog state--read js-messages-dialog">
#         <span className="messages__user-avatar">
#           <span className="avatar avatar--third">
#             <span className="avatar__text">N</span>
#           </span>
#         </span>
#         <div className="messages__dialog-text">
#           <span className="messages__user-name">nevergreen</span> Социальная парадигма, согласно традиционным представлениям…
#         </div>
#         <span className="messages__date">Вчера в 20:08</span>
#       </div>
#       <div data-id="4"
#            className="messages__dialog state--read js-messages-dialog">
#         <span className="messages__user-avatar">
#           <span className="avatar avatar--seventh">
#             <span className="avatar__text">B</span>
#           </span>
#           <span className="messages__user-online"></span>
#         </span>
#         <div className="messages__dialog-text">
#           <span className="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…
#         </div>
#         <span className="messages__date">Вчера в 20:08</span>
#       </div>
#       <div data-id="5"
#            className="messages__dialog state--read js-messages-dialog">
#         <span className="messages__user-avatar">
#           <span className="avatar avatar--seventh">
#             <span className="avatar__text">B</span>
#           </span>
#           <span className="messages__user-online"></span>
#         </span>
#         <div className="messages__dialog-text">
#           <span className="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…
#         </div>
#         <span className="messages__date">Вчера в 20:08</span>
#       </div>
#       <div data-id="6"
#            className="messages__dialog state--read js-messages-dialog">
#         <span className="messages__user-avatar">
#           <span className="avatar avatar--seventh">
#             <span className="avatar__text">B</span>
#           </span>
#           <span className="messages__user-online"></span>
#         </span>
#         <div className="messages__dialog-text">
#           <span className="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…
#         </div>
#         <span className="messages__date">Вчера в 20:08</span>
#       </div>
#       <div data-id="7"
#            className="messages__dialog state--read js-messages-dialog">
#         <span className="messages__user-avatar">
#           <span className="avatar avatar--seventh">
#             <span className="avatar__text">B</span>
#           </span>
#           <span className="messages__user-online"></span>
#         </span>
#         <div className="messages__dialog-text">
#           <span className="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…
#         </div>
#         <span className="messages__date">Вчера в 20:08</span>
#       </div>
