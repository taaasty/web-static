###* @jsx React.DOM ###

window.NotificationsPopup_Notification = React.createClass

  propTypes:
    notification: React.PropTypes.object.isRequired

  render: ->
    userSlug = @props.notification.user.slug
    action   = @props.notification.action
    text     = @props.notification.text
    imageUrl = @props.notification.image

    if @props.notification.online
      online = `<div className="notification__user-online" />` 

    if @props.notification.image
      image  = `<figure className="notification__image">
                  <img src={ imageUrl } />
                </figure>`

    return `<li className="notification">
              <a href="#"
                 className="notification__link">
                <div className="notification__inner">
                  { online }
                  <div className="notification__user-avatar">
                    <UserAvatar user={ this.props.notification.user } size={ 35 } />
                  </div>
                  { image }
                  <div className="notification__desc">
                    <span className="notification__user">{ userSlug }</span>
                    <span> { action }: </span>
                    <span className="notification__text">{ text }</span>
                  </div>
                </div>
              </a>
            </li>`