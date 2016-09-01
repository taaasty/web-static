/*global i18n */
import React, { PropTypes } from 'react';
import Scroller from '../common/Scroller';
import NotificationsNotificationList from './NotificationList';
import NotificationsLoadingMessage from './LoadingMessage';
import NotificationsErrorMessage from './ErrorMessage';
import Spinner from '../../../../shared/react/components/common/Spinner';
import Routes from '../../../../shared/routes/routes';
import { Link } from 'react-router';
import { onlyUpdateForKeys } from 'recompose';

function Notifications(props) {
  const {
    error,
    getNotifications,
    hasUnread,
    hide,
    isFetching,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    notifications,
    senders,
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
            senders={senders}
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
      <div className="notifications__footer">
        <Link onClick={hide} to={Routes.activities()}>
          {i18n.t('notifications.go_to_activity')}
        </Link>
      </div>
    </div>
  );
}

Notifications.propTypes = {
  error: PropTypes.bool,
  getNotifications: PropTypes.func.isRequired,
  hasUnread: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  markAllNotificationsAsRead: PropTypes.func.isRequired,
  markNotificationAsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
  senders: PropTypes.object.isRequired,
};

export default onlyUpdateForKeys([
  'error',
  'hasUnread',
  'isFetching',
  'notifications',
  'senders',
])(Notifications);
