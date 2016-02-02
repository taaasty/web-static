import React, { PropTypes } from 'react';

let UserToolbarToggle = React.createClass({
  propTypes: {
    hasConversations: PropTypes.bool.isRequired,
    hasNotifications: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
  },

  render() {
    return (
      <div
        className="toolbar__toggle"
        onMouseEnter={this.onMouseEnter}
        onTouchTap={this.onClick}
      >
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

  onClick() {
    this.props.onClick();
  },

  onMouseEnter() {
    this.props.onMouseEnter();
  },
});

export default UserToolbarToggle;
