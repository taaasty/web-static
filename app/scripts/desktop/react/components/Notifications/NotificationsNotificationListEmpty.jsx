let NotificationsNotificationListEmpty = React.createClass({
  render() {
    return (
      <div className="notifications__empty">
        {i18n.t('notifications_empty_list')}
      </div>
    );
  }
});

export default NotificationsNotificationListEmpty;