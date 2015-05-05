import NotificationStore from '../../stores/NotificationStore';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import NotificationActionCreators from '../../actions/Notification';
import Notifications from './Notifications';

let NotificationsContainer = React.createClass({
  propTypes: {
    notifications: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
    loadingMore: React.PropTypes.bool.isRequired,
    error: React.PropTypes.bool.isRequired,
    everythingLoaded: React.PropTypes.bool.isRequired,
    onUpdate: React.PropTypes.func
  },

  componentDidMount() {
    NotificationActionCreators.load();
  },

  componentDidUpdate() {
    if (this.props.onUpdate != null) this.props.onUpdate();
  },

  componentWillUnmount() {
    this.props.notifications.forEach((notification) => {
      if (notification.read_at === null) this.markAsRead(notification.id);
    });
  },

  render() {
    let actions = {
      onNotificationRead: this.markAsRead,
      onLoadMore: this.loadMore
    };

    return <Notifications {...this.props} {...actions} />;
  },

  markAsRead(notificationID) {
    NotificationActionCreators.markAsRead(notificationID);
  },

  loadMore() {
    let { notifications } = this.props;
    let sinceID = notifications[notifications.length - 1].id;

    NotificationActionCreators.loadMore(sinceID);
  }
});

NotificationsContainer = connectToStores(NotificationsContainer, [NotificationStore], (props) => ({
  notifications: NotificationStore.getAllChrono(),
  loading: NotificationStore.isLoading(),
  loadingMore: NotificationStore.isLoadingMore(),
  error: NotificationStore.isError(),
  everythingLoaded: NotificationStore.isEverythingLoaded()
}));

export default NotificationsContainer;