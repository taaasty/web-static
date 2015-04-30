import Scroller from '../common/scroller/scroller';
import NotificationsNotificationList from './NotificationsNotificationList';
import NotificationsLoadingMessage from './NotificationsLoadingMessage';
import NotificationsErrorMessage from './NotificationsErrorMessage';

let Notifications = React.createClass({
  propTypes: {
    notifications: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
    loadingMore: React.PropTypes.bool.isRequired,
    error: React.PropTypes.bool.isRequired,
    everythingLoaded: React.PropTypes.bool.isRequired,
    onNotificationRead: React.PropTypes.func.isRequired,
    onLoadMore: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="notifications">
        <Scroller
            className="scroller--notifications"
            onScroll={this.handleScroll}>
          {this.renderContent()}
        </Scroller>
      </div>
    );
  },

  renderContent() {
    if (this.props.loading && this.props.notifications.length == 0) {
      return <NotificationsLoadingMessage />;
    } else if (this.props.error) {
      return <NotificationsErrorMessage />;
    } else {
      return (
        <div>
          <NotificationsNotificationList
              notifications={this.props.notifications}
              onNotificationRead={this.props.onNotificationRead} />
          {this.renderSpinner()}
        </div>
      );
    }
  },

  renderSpinner() {
    if (this.props.loadingMore) {
      return (
        <div className="loader">
          <Spinner size={15} />
        </div>
      );
    }
  },

  handleScroll(e) {
    if (this.props.everythingLoaded || this.props.loadingMore) return;

    let el = e.target;
    if (el.scrollTop + el.offsetHeight > el.scrollHeight * .9) {
      this.props.onLoadMore();
    }
  }
});

export default Notifications;