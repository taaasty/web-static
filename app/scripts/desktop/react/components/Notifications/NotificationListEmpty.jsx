/*global i18n */
import React from 'react';

function NotificationsNotificationListEmpty() {
  return (
    <div className="notifications__empty">
      {i18n.t('notifications_empty_list')}
    </div>
  );
}

export default NotificationsNotificationListEmpty;
