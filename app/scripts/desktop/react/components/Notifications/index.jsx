import React, { Component, PropTypes } from 'react';
import NotificationStore from '../../stores/NotificationStore';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import NotificationActionCreators from '../../actions/Notification';
import Notifications from './Notifications';

class NotificationsContainer extends Component {
  componentDidMount() {
    NotificationActionCreators.load();
  }
  componentDidUpdate() {
    if (this.props.onUpdate != null) {
      this.props.onUpdate();
    }
  }
  componentWillUnmount() {
    this.markAllAsRead();
  }
  markAsRead(notificationID) {
    NotificationActionCreators.markAsRead(notificationID);
  }
  markAllAsRead() {
    this.props.notifications.forEach((notification) => {
      if (notification.read_at === null) {
        this.markAsRead(notification.id);
      }
    });
  }
  loadMore() {
    const { notifications } = this.props;
    const sinceID = notifications[notifications.length - 1].id;

    NotificationActionCreators.loadMore(sinceID);
  }
  render() {
    return (
      <Notifications {...this.props}
        markAllAsRead={this.markAllAsRead.bind(this)}
        onLoadMore={this.loadMore.bind(this)}
        onNotificationRead={this.markAsRead.bind(this)}
      /> 
    );
  }
}

NotificationsContainer.propTypes = {
  error: PropTypes.bool.isRequired,
  everythingLoaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
  onUpdate: PropTypes.func,
};

const ConnectedNotificationsContainer = connectToStores(
  NotificationsContainer,
  [NotificationStore],
  () => ({
    notifications: NotificationStore.getAllChrono(),
    loading: NotificationStore.isLoading(),
    loadingMore: NotificationStore.isLoadingMore(),
    error: NotificationStore.isError(),
    everythingLoaded: NotificationStore.isEverythingLoaded(),
  })
);

export default ConnectedNotificationsContainer;
