import React, { PropTypes } from 'react';
import Scroller from '../common/scroller/scroller';
import NotificationsNotificationList from './NotificationsNotificationList';
import NotificationsLoadingMessage from './NotificationsLoadingMessage';
import NotificationsErrorMessage from './NotificationsErrorMessage';
import Spinner from '../../../../shared/react/components/common/Spinner';

class Notifications {
  handleScroll(ev) {
    const { everythingLoaded, loadingMore, onLoadMore } = this.props;
    if (everythingLoaded || loadingMore) {
      return;
    }

    const el = ev.target;
    if (el.scrollTop + el.offsetHeight > el.scrollHeight * .9) {
      onLoadMore();
    }
  }
  onClickMarkAllButton() {
    this.props.markAllAsRead();
  }
  renderContent() {
    const { loading, notifications, error, onNotificationRead } = this.props;

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
          {this.renderSpinner()}
        </div>
      );
    }
  }
  renderSpinner() {
    if (this.props.loadingMore) {
      return (
        <div className="loader">
          <Spinner size={14} />
        </div>
      );
    }
  }
  renderMarkAllButton() {
    return this.props.notifications.some((el) => el.read_at === null)
      ? <div className="notifications__mark-all-read" onClick={this.onClickMarkAllButton.bind(this)}>
          <span className="icon icon--double-tick" />
          {i18n.t('buttons.notifications.mark_all_read')}
        </div>
      : null;
  }
  render() {
    return (
      <div className="notifications">
        {this.renderMarkAllButton()}
        <Scroller
          className="scroller--notifications"
          onScroll={this.handleScroll.bind(this)}
        >
          {this.renderContent()}
        </Scroller>
      </div>
    );
  }
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
