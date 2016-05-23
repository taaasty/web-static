import React, { PropTypes } from 'react';
import NotificationsNotificationListItem from './NotificationsNotificationListItem';
import NotificationsNotificationListEmpty from './NotificationsNotificationListEmpty';

function  NotificationsNotificationList({ notifications, onNotificationRead }) {
  return notifications.length
    ? <ul className="notifications__list">
        {notifications.map((item) => (
          <NotificationsNotificationListItem
            key={item.id}
            notification={item}
            onNotificationRead={onNotificationRead.bind(null, item.id)}
          />
         ))
        }
      </ul>
    : <NotificationsNotificationListEmpty />;
}

NotificationsNotificationList.propTypes = {
  notifications: PropTypes.array.isRequired,
  onNotificationRead: PropTypes.func.isRequired,
};

export default NotificationsNotificationList;
