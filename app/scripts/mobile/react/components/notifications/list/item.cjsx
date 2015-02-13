cx         = require 'react/lib/cx'
UserAvatar = require '../../common/avatar/user'
Image      = require '../../common/image/image'
{ PropTypes } = React

NotificationsListItem = React.createClass
  displayName: 'NotificationsListItem'

  propTypes:
    notification: PropTypes.object.isRequired

  render: ->
    itemClasses = cx
      'notification': true
      '__unread': @isUnread()

    return <li className={ itemClasses }>
             <a href={ @props.notification.entity_url }
                target="_blank"
                className="notification__link">
               <div className="notification__inner">
                 <div className="notification__read-state" />
                 <div className="notification__user-avatar">
                   <UserAvatar
                       user={ @props.notification.sender }
                       size={ 42 } />
                 </div>
                 { @renderNotificationImage() }
                 <div className="notification__desc">
                   <span className="notification__spacer" />
                   <span className="notification__content">
                     <span className="notification__user">
                       { @props.notification.sender.slug }
                     </span>
                     <span className="notification__action-text"> { @props.notification.action_text }: </span>
                     <span className="notification__text">
                       { @props.notification.text }
                     </span>
                   </span>
                 </div>
               </div>
             </a>
           </li>

  renderNotificationImage: ->
    if @props.notification.image?
      <Image image={ @props.notification.image }
             maxWidth={ 70 }
             className="notification__image" />

  isUnread: ->
    @props.notification.read_at is null

module.exports = NotificationsListItem