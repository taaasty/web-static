/*global i18n */
import React, { PropTypes } from 'react';
import Scroller from '../common/Scroller';
import NotificationsNotificationList from './NotificationsNotificationList';
import NotificationsLoadingMessage from './NotificationsLoadingMessage';
import NotificationsErrorMessage from './NotificationsErrorMessage';
import Spinner from '../../../../shared/react/components/common/Spinner';

function Notifications(props) {
  function handleScroll(ev) {
    const { everythingLoaded, loadingMore, onLoadMore } = props;

    if (everythingLoaded || loadingMore) {
      return;
    }

    const el = ev.target;
    if (el.scrollTop + el.offsetHeight > el.scrollHeight * .9) {
      onLoadMore();
    }
  }

  function onClickMarkAllButton() {
    props.markAllAsRead();
  }

  function renderContent() {
    const { loading, loadingMore, notifications, error, onNotificationRead } = props;

    if (loading && notifications.length == 0) {
      return <NotificationsLoadingMessage />;
    } else if (error) {
      return <NotificationsErrorMessage />;
    } else {
      return (
        <div>
          <NotificationsNotificationList
            notifications={notifications}
            onNotificationRead={onNotificationRead}
          />
          {loadingMore && renderSpinner()}
        </div>
      );
    }
  }

  function renderSpinner() {
    return (
      <div className="loader">
        <Spinner size={14} />
      </div>
    );
  }

  function renderMarkAllButton() {
    return props.notifications.some((el) => el.read_at === null)
      ? <div className="notifications__mark-all-read" onClick={onClickMarkAllButton}>
          <span className="icon icon--double-tick" />
          {i18n.t('buttons.notifications.mark_all_read')}
        </div>
      : <noscript />;
  }

  return (
    <div className="notifications">
      {renderMarkAllButton()}
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
  error: PropTypes.bool.isRequired,
  everythingLoaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onNotificationRead: PropTypes.func.isRequired,
};

export default Notifications;
