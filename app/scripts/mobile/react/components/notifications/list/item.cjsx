cx         = require 'react/lib/cx'
UserAvatar = require '../../common/avatar/user'
Image      = require '../../common/image/image'
{ PropTypes } = React

NotificationListItem = React.createClass
  displayName: 'NotificationListItem'

  propTypes:
    item:   PropTypes.object.isRequired
    onRead: PropTypes.func.isRequired

  render: ->
    itemClasses = cx
      'notification': true
      '__unread': @isUnread()

    return <li className={ itemClasses }
               onClick={ @handleClick }>
             <a href={ @props.item.entity_url }
                target="_blank"
                className="notification__link">
               <div className="notification__inner">
                 <div className="notification__read-state" />
                 <div className="notification__user-avatar">
                   <UserAvatar
                       user={ @props.item.sender }
                       size={ 42 } />
                 </div>
                 { @renderNotificationImage() }
                 <div className="notification__desc">
                   <span className="notification__spacer" />
                   <span className="notification__content">
                     <span className="notification__user">
                       { @props.item.sender.slug }
                     </span>
                     <span className="notification__action-text"> { @props.item.action_text }: </span>
                     <span className="notification__text">
                       { @props.item.text }
                     </span>
                   </span>
                 </div>
               </div>
             </a>
           </li>

  renderNotificationImage: ->
    if @props.item.image?
      <Image image={ @props.item.image }
             maxWidth={ 70 }
             className="notification__image" />

  isUnread: ->
    @props.item.read_at is null

  handleClick: ->
    @props.onRead @props.item.id if @isUnread()

module.exports = NotificationListItem