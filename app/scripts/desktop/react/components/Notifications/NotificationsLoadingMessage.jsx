let NotificationsLoadingMessage = React.createClass({
  render() {
    return (
      <div className="notifications__empty">
        <Spinner size={24} />
      </div>
    );
  }
});

export default NotificationsLoadingMessage;