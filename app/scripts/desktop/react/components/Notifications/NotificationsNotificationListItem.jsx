import classnames from 'classnames';
import Image from '../../../../shared/react/components/common/Image';

let NotificationsNotificationListItem = React.createClass({
  propTypes: {
    notification: React.PropTypes.object.isRequired,
    onNotificationRead: React.PropTypes.func.isRequired
  },

  render() {
    let notificationClasses = classnames('notification', {
      'state--unread': this.props.notification.read_at == null
    });

    return (
      <li className={notificationClasses} onTouchTap={this.handleClick}>
        <a href={this.props.notification.entity_url}
           target="_blank"
           className="notification__link">
          <div className="notification__inner">
            <div className="notification__read-state" />
            <div className="notification__user-avatar">
              <UserAvatar user={this.props.notification.sender} size={35} />
            </div>
            {this.renderImage()}
            <div className="notification__desc">
              <span className="notification__user">{this.props.notification.sender.slug}</span>
              <span className="notification__action-text"> {this.props.notification.action_text} </span>
              <span className="notification__text">{this.props.notification.text}</span>
            </div>
          </div>
        </a>
      </li>
    );
  },

  renderImage() {
    if (this.props.notification.image != null) {
      return (
        <Image
            image={this.props.notification.image}
            maxWidth={70}
            className="notification__image" />
      );
    }
  },

  handleClick() {
    if (this.props.notification.read_at == null) {
      this.props.onNotificationRead();
    }
  }
});

export default NotificationsNotificationListItem;