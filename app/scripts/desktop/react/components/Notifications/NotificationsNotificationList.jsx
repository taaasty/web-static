import NotificationsNotificationListItem from './NotificationsNotificationListItem';
import NotificationsNotificationListEmpty from './NotificationsNotificationListEmpty';

let NotificationsNotificationList = React.createClass({
  propTypes: {
    notifications: React.PropTypes.array.isRequired,
    onNotificationRead: React.PropTypes.func.isRequired
  },

  render() {
    if (this.props.notifications.length) {
      let notifications = this.props.notifications.map((item) => {
        return (
          <NotificationsNotificationListItem
              notification={item}
              onNotificationRead={this.props.onNotificationRead.bind(null, item.id)}
              key={item.id} />
        );
      });

      return (
        <ul className="notifications__list">
          {notifications}
        </ul>
      );
    } else {
      return <NotificationsNotificationListEmpty />;
    }
  }
});

export default NotificationsNotificationList;