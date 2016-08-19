import React from 'react';
import Spinner from '../../../../shared/react/components/common/Spinner';

function NotificationsLoadingMessage() {
  return (
    <div className="notifications__empty">
      <Spinner size={24} />
    </div>
  );
}

export default NotificationsLoadingMessage;
