/*global i18n */
import React from 'react';

function NotificationsErrorMessage() {
  return (
    <div className="notifications__empty">
      {i18n.t('notifications_loading_error')}
    </div>
  );
}

export default NotificationsErrorMessage;
