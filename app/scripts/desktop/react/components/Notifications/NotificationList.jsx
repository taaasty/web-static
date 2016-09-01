import React, { PropTypes } from 'react';
import NotificationsNotificationListItem from './NotificationListItem';
import NotificationsNotificationListEmpty from './NotificationListEmpty';

function NotificationsNotificationList(props) {
  const {
    markNotificationAsRead,
    notifications,
    senders,
  } = props;

  return notifications.count() > 0
    ? (
      <ul className="notifications__list">
        {notifications.map((item, key) => (
          <NotificationsNotificationListItem
            key={item.get('id')}
            notification={item}
            onNotificationRead={markNotificationAsRead.bind(null, item.get('id'))}
            sender={senders.get(key)}
          />
          )).valueSeq()
        }
      </ul>
    )
    : <NotificationsNotificationListEmpty />;
}

NotificationsNotificationList.propTypes = {
  markNotificationAsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
  senders: PropTypes.object.isRequired,
};

export default NotificationsNotificationList;
