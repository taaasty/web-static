/*global i18n */
import React, { PropTypes } from 'react';
import Scroller from '../common/Scroller';
import NotificationsNotificationList from './NotificationList';
import NotificationsLoadingMessage from './LoadingMessage';
import NotificationsErrorMessage from './ErrorMessage';
import Spinner from '../../../../shared/react/components/common/Spinner';

function Notifications(props) {
  const {
    error,
    getNotifications,
    hasUnread,
    isFetching,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    notifications,
  } = props;

  function handleScroll(ev) {
    const el = ev.target;
    if (el.scrollTop + el.offsetHeight > el.scrollHeight * .9) {
      getNotifications();
    }
  }

  function renderContent() {
    if (isFetching && notifications.count() === 0) {
      return <NotificationsLoadingMessage />;
    } else if (error) {
      return <NotificationsErrorMessage />;
    } else {
      return (
        <div>
          <NotificationsNotificationList
            markNotificationAsRead={markNotificationAsRead}
            notifications={notifications}
          />
          {isFetching && (
            <div className="loader">
              <Spinner size={14} />
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="notifications">
      {hasUnread && (
        <div
          className="notifications__mark-all-read"
          onClick={markAllNotificationsAsRead}
        >
          <span className="icon icon--double-tick" />
          {i18n.t('buttons.notifications.mark_all_read')}
        </div>
      )}
      <Scroller
        className="scroller--notifications"
        onScroll={handleScroll}
      >
        {renderContent()}
      </Scroller>
    </div>
  );
}

Notifications.propTypes = {
  error: PropTypes.bool,
  getNotifications: PropTypes.func.isRequired,
  hasUnread: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  markAllNotificationsAsRead: PropTypes.func.isRequired,
  markNotificationAsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
};

export default Notifications;
