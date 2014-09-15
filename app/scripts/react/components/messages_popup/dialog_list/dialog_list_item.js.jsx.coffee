###* @jsx React.DOM ###

window.MessagesPopup_DialogListItem = React.createClass

  propTypes:
    user:             React.PropTypes.object.isRequired
    lastMessage:      React.PropTypes.object.isRequired
    newMessagesCount: React.PropTypes.number

  render: ->
   `<div className="messages__dialog js-messages-dialog">
      { this._getNewMessagesCount() }
      <span className="messages__user-avatar">
        <span className="avatar" style={{ 'background-image': 'url(images/avatars/ava_6.png)' }}>
          <img className="avatar__img" src="images/avatars/ava_6.png" alt="vladaserb" />
        </span>
        <span className="messages__user-online"></span>
      </span>
      <div className="messages__dialog-text">
        <span className="messages__user-name">vladaserb</span> { this.props.lastMessage.text }
      </div>
      <span className="messages__date">20 минут назад</span>
    </div>`

  _getNewMessagesCount: ->
    if @props.newMessagesCount > 0
      `<div className="messages__counter">{ this.props.newMessagesCount }</div>`

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