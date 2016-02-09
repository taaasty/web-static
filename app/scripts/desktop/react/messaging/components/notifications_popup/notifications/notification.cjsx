UserAvatar = require '../../../../components/UserAvatar';
classnames = require 'classnames'

IMAGE_SIZE = 50

window.NotificationsPopup_Notification = React.createClass

  propTypes:
    notification: React.PropTypes.object.isRequired

  componentWillUnmount: ->
    NotificationActions.readNotification @props.notification.id if @isUnread()

  render: ->
    notificationClasses = classnames('notification', {
      'state--unread': @isUnread()
    })

    userSlug   = @props.notification.sender.slug
    actionText = @props.notification.action_text
    text       = @props.notification.text
    entityUrl  = @props.notification.entity_url

    image = @_getNotificationImage() if @props.notification.image

    return <li className={ notificationClasses }
               onClick={ this.handleClick }>
             <a href={ entityUrl }
                target="_blank"
                className="notification__link">
               <div className="notification__inner">
                 <div className="notification__read-state" />
                 <div className="notification__user-avatar">
                   <UserAvatar user={ this.props.notification.sender } size={ 35 } />
                 </div>
                 { image }
                 <div className="notification__desc">
                   <span className="notification__user">{ userSlug }</span>
                   <span className="notification__action-text"> { actionText } </span>
                   <span className="notification__text">{ text }</span>
                 </div>
               </div>
             </a>
           </li>

  isUnread: -> @props.notification.read_at is null

  _getNotificationImage: ->
    url = ThumborService.imageUrl
      url:  @props.notification.image.url
      path: @props.notification.image.path
      size: IMAGE_SIZE + 'x' + IMAGE_SIZE
    geometry    = @props.notification.image.geometry
    aspectRatio = @calculateAspectRatioFit(geometry.width, geometry.height, IMAGE_SIZE, IMAGE_SIZE)
    imageStyles = {
      height: aspectRatio.height + 'px'
      width:  aspectRatio.width + 'px'
    }

    return <figure className="notification__image"
                   style={ imageStyles }>
             <img src={ url } />
           </figure>

  calculateAspectRatioFit: (srcWidth, srcHeight, maxWidth, maxHeight) ->
    ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)

    return {
      width:  srcWidth * ratio
      height: srcHeight * ratio
    }

  handleClick: ->
    NotificationActions.readNotification @props.notification.id if @isUnread()