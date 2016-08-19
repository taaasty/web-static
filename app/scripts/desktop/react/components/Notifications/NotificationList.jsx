import React, { PropTypes } from 'react';
import NotificationsNotificationListItem from './NotificationListItem';
import NotificationsNotificationListEmpty from './NotificationListEmpty';

function NotificationsNotificationList({ markNotificationAsRead, notifications }) {
  return notifications.count() > 0
    ? (
      <ul className="notifications__list">
        {notifications.map((item) => (
          <NotificationsNotificationListItem
            key={item.get('id')}
            notification={item}
            onNotificationRead={markNotificationAsRead.bind(null, item.get('id'))}
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
};

export default NotificationsNotificationList;
