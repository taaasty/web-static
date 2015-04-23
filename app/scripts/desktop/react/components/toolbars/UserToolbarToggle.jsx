let UserToolbarToggle = React.createClass({
  propTypes: {
    hasConversations: React.PropTypes.bool.isRequired,
    hasNotifications: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="toolbar__toggle" onTouchTap={this.handleClick}>
        {this.renderIndicators()}
        <i className="icon icon--menu" />
      </div>
    );
  },

  renderIndicators() {
    let conversationsIndicator, notificationsIndicator;

    if (this.props.hasConversations) {
      conversationsIndicator = <i className="toolbar__m-indicator toolbar__m-indicator--messages" />;
    }

    if (this.props.hasNotifications) {
      notificationsIndicator = <i className="toolbar__m-indicator toolbar__m-indicator--notifications" />;
    }

    return (
      <span className="toolbar__m-indicators">
        {conversationsIndicator}
        {notificationsIndicator}
      </span>
    );
  },

  handleClick() {
    this.props.onClick();
  }
});

export default UserToolbarToggle;