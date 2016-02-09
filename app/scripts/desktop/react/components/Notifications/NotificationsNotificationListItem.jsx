import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Image from '../../../../shared/react/components/common/Image';
import UserAvatar from '../UserAvatar';

function NotificationsNotificationListItem({ notification, onNotificationRead }) {
  function handleClick() {
    if (notification.read_at == null) {
      onNotificationRead();
    }
  }

  const notificationClasses = classnames({
    'notification': true,
    'state--unread': notification.read_at == null,
  });

  return (
    <li className={notificationClasses} onTouchTap={handleClick}>
      <a
        className="notification__link"
        href={notification.entity_url}
        target="_blank"
      >
        <div className="notification__inner">
          <div className="notification__read-state" />
          <div className="notification__user-avatar">
            <UserAvatar size={35} user={notification.sender} />
          </div>
          {notification.image != null &&
           <Image
             className="notification__image"
             image={notification.image}
             maxWidth={70}
           />
          }
          <div className="notification__desc">
            <span className="notification__user">{notification.sender.slug}</span>
            <span className="notification__action-text"> {notification.action_text} </span>
            <span className="notification__text">{notification.text}</span>
          </div>
        </div>
      </a>
    </li>
  );
}

NotificationsNotificationListItem.propTypes = {
  notification: PropTypes.object.isRequired,
  onNotificationRead: PropTypes.func.isRequired,
};

export default NotificationsNotificationListItem;
