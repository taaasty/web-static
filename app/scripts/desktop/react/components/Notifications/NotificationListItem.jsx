import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Image from '../../../../shared/react/components/common/Image';
import UserAvatar from '../UserAvatar/new';
import { Link } from 'react-router';
import uri from 'urijs';
import { msgDate } from '../../helpers/dateHelpers';
import { Map } from 'immutable';

const NOTIFICATION_ENTITY_TYPE_COMMENT = 'Comment';
const NOTIFICATION_ENTITY_TYPE_ENTRY = 'Entry';
//const NOTIFICATION_ENTITY_TYPE_RELATIONSHIP = 'Relationship';

function NotificationsNotificationListItem({ notification, onNotificationRead }) {
  const readAt = notification.get('readAt');
  const entityType = notification.get('entityType');
  const sender = notification.get('sender', Map());
  const senderUrl = sender.get('tlogUrl', '');
  const senderSlug = sender.get('slug', '');

  function handleClick() {
    if (!readAt) {
      onNotificationRead();
    }
  }

  function state() {
    if (entityType === NOTIFICATION_ENTITY_TYPE_ENTRY) {
      return { id: notification.get('entityId') };
    } else if (entityType === NOTIFICATION_ENTITY_TYPE_COMMENT) {
      return { id: notification.get('parentId') };
    } else {
      return void 0;
    }
  }

  const notificationClasses = classNames({
    'notification': true,
    'state--unread': !readAt,
  });
  const entityLocation = { pathname: uri(notification.get('entityUrl')).path(), state: state()};

  return (
    <li className={notificationClasses} onTouchTap={handleClick}>
      <div className="notification__link">
        <div className="notification__inner">
          <div className="notification__read-state" />
          <div className="notification__user-avatar">
            <Link to={uri(senderUrl).path()}>
              <UserAvatar size={40} user={sender.toJS()} />
            </Link>
          </div>
          {notification.image != null &&
           <Link to={entityLocation}>
             <Image
               className="notification__image"
               image={notification.get('image', Map()).toJS()}
               maxHeight={40}
               maxWidth={40}
             />
           </Link>
          }
          <div className="notification__desc">
            <span className="notification__user">
              <Link to={uri(senderUrl).path()}>
                {senderSlug}
              </Link>
            </span>
            <span className="notification__action-text">
              {' '}
              <Link to={entityLocation}>
                {notification.get('actionText', '')}
              </Link>
              {' '}
            </span>
            <span className="notification__text">
              <Link to={entityLocation}>
                {notification.get('text', '')}
              </Link>
            </span>
            <div className="notification__date">
              {msgDate(notification.get('createdAt', ''))}
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
