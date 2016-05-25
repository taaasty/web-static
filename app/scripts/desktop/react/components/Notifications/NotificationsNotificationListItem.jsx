import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Image from '../../../../shared/react/components/common/Image';
import UserAvatar from '../UserAvatar';
import { Link } from 'react-router';
import uri from 'urijs';
import { msgDate } from '../../helpers/dateHelpers';

const NOTIFICATION_ENTITY_TYPE_COMMENT = 'Comment';
const NOTIFICATION_ENTITY_TYPE_ENTRY = 'Entry';
//const NOTIFICATION_ENTITY_TYPE_RELATIONSHIP = 'Relationship';

function NotificationsNotificationListItem({ notification, onNotificationRead }) {
  function handleClick() {
    if (notification.read_at == null) {
      onNotificationRead();
    }
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
  const entityLocation = { pathname: uri(notification.entity_url).path(), state: state()};

  return (
    <li className={notificationClasses} onTouchTap={handleClick}>
      <div className="notification__link">
        <div className="notification__inner">
          <div className="notification__read-state" />
          <div className="notification__user-avatar">
            <Link to={uri(notification.sender.tlog_url).path()}>
              <UserAvatar size={40} user={notification.sender} />
            </Link>
          </div>
          {notification.image != null &&
           <Link to={entityLocation}>
             <Image
               className="notification__image"
               image={notification.image}
               maxHeight={40}
               maxWidth={40}
             />
           </Link>
          }
          <div className="notification__desc">
            <span className="notification__user">
              <Link to={uri(notification.sender.tlog_url).path()}>
                {notification.sender.slug}
              </Link>
            </span>
            <span className="notification__action-text">
              {' '}
              <Link to={entityLocation}>
                {notification.action_text}
              </Link>
              {' '}
            </span>
            <span className="notification__text">
              <Link to={entityLocation}>
                {notification.text}
              </Link>
            </span>
            <div className="notification__date">
              {msgDate(notification.created_at)}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

NotificationsNotificationListItem.propTypes = {
  notification: PropTypes.object.isRequired,
  onNotificationRead: PropTypes.func.isRequired,
};

export default NotificationsNotificationListItem;
