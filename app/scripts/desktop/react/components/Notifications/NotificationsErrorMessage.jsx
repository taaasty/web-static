let NotificationsErrorMessage = React.createClass({
  render() {
    return (
      <div className="notifications__empty">
        {i18n.t('notifications_loading_error')}
      </div>
    );
  }
});

export default NotificationsErrorMessage;