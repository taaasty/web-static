import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Image from '../../../../shared/react/components/common/Image';
import UserAvatar from '../avatars/UserAvatar';
import { browserHistory, Link } from 'react-router';
import uri from 'urijs';

const NOTIFICATION_ENTITY_TYPE_COMMENT = 'Comment';
const NOTIFICATION_ENTITY_TYPE_ENTRY = 'Entry';
//const NOTIFICATION_ENTITY_TYPE_RELATIONSHIP = 'Relationship';

function NotificationsNotificationListItem({ notification, onNotificationRead }) {
  function handleClick() {
    if (notification.read_at == null) {
      onNotificationRead();
    }
  }

  function handleClickLink(ev) {
    ev.preventDefault();
    browserHistory.push({ pathname: uri(notification.entity_url).path(), state: state() });
  }

  function state() {
    return notification.entity_type === NOTIFICATION_ENTITY_TYPE_ENTRY
      ? { id: notification.entity_id }
      : notification.entity_type === NOTIFICATION_ENTITY_TYPE_COMMENT
        ? { id: notification.parent_id }
        : void 0;
  }

  const notificationClasses = classnames({
    'notification': true,
    'state--unread': notification.read_at == null,
  });

  return (
    <li className={notificationClasses} onTouchTap={handleClick}>
      <a
        className="notification__link"
        href={uri(notification.entity_url).path()}
        onClick={handleClickLink}
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
