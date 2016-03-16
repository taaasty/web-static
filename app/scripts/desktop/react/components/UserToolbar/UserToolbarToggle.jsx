import React, { createClass, PropTypes } from 'react';

const UserToolbarToggle = createClass({
  propTypes: {
    hasConversations: PropTypes.bool.isRequired,
    hasNotifications: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
  },

  onClick() {
    this.props.onClick();
  },

  onMouseEnter() {
    this.props.onMouseEnter();
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
});

export default UserToolbarToggle;
