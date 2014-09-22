###* @jsx React.DOM ###

window.MessagesPopup_ConversationsListItem = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    conversation: React.PropTypes.object.isRequired

  render: ->
    online = `<span className="messages__user-online" />` if @props.conversation.online

    if @props.conversation.last_message?
      lastMessageText = `<span dangerouslySetInnerHTML={{ __html: this._getLastMessageText() }} />`
      lastCreatedAt   = @_getLastMessageCreatedAt()
    else
      lastCreatedAt   = @_getLastConversationCreatedAt()

    return `<div className="messages__dialog"
                 onClick={ this.handleClick }>
              { this._getUnreadMessagesCount() }

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

  _getUnreadMessagesCount: ->
    if @props.conversation.unread_messages_count > 0
      `<div className="messages__counter">{ this.props.conversation.unread_messages_count }</div>`

  _getLastMessageText: ->
    @props.conversation.last_message.content_html

  _getLastMessageCreatedAt: ->
    moment( @props.conversation.last_message.created_at ).format 'D MMMM LT'

  _getLastConversationCreatedAt: ->
    moment( @props.conversation.created_at ).format 'D MMMM LT'

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
