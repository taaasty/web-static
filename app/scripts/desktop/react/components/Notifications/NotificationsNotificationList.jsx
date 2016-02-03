import React, { PropTypes } from 'react';
import NotificationsNotificationListItem from './NotificationsNotificationListItem';
import NotificationsNotificationListItemSPA from './NotificationsNotificationListItemSPA';
import NotificationsNotificationListEmpty from './NotificationsNotificationListEmpty';

function  NotificationsNotificationList({ notifications, onNotificationRead }) {
  const ListItem = window.SPA ? NotificationsNotificationListItemSPA : NotificationsNotificationListItem;

  return notifications.length
    ? <ul className="notifications__list">
        {notifications.map((item) => (
          <ListItem
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
