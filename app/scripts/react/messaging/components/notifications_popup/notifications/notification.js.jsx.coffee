###* @jsx React.DOM ###

IMAGE_SIZE = 50

window.NotificationsPopup_Notification = React.createClass

  propTypes:
    notification: React.PropTypes.object.isRequired

  componentWillUnmount: ->
    NotificationActions.readNotification @props.notification.id if @isUnread()

  render: ->
    notificationClasses = React.addons.classSet {
      'notification':  true
      'state--unread': @isUnread()
    }
    userSlug   = @props.notification.sender.slug
    actionText = @props.notification.action_text
    text       = @props.notification.text
    entityUrl  = @props.notification.entity_url

    if @props.notification.image
      imageUrl = ThumborService.image_url @props.notification.image.url, IMAGE_SIZE + 'x' + IMAGE_SIZE
      image    = `<figure className="notification__image">
                    <img src={ imageUrl } />
                  </figure>`

    return `<li className={ notificationClasses }
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
                    <span className="notification__action-text"> { actionText }: </span>
                    <span className="notification__text">{ text }</span>
                  </div>
                </div>
              </a>
            </li>`

  isUnread: -> @props.notification.read_at is null

  handleClick: ->
    NotificationActions.readNotification @props.notification.id if @isUnread()