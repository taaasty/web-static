import React, { Component, PropTypes } from 'react';
import Notifications from './Notifications';
import { connect } from 'react-redux';
import {
  NOTIFICATION_MY,
  getFilterNotifications,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../../actions/NotificationsActions';
import { Map } from 'immutable';

const emptyUser = Map();

class NotificationsContainer extends Component {
  componentWillMount() {
    this.getNotifications = this.props.getNotifications.bind(null, NOTIFICATION_MY);

    this.getNotifications();
  }
  componentWillUnmount() {
    const {
      hasUnread,
      markAllNotificationsAsRead,
    } = this.props;

    if (hasUnread) {
      markAllNotificationsAsRead();
    }
  }
  render() {
    return (
      <Notifications {...this.props}
        getNotifications={this.getNotifications}
      />
    );
  }
}

NotificationsContainer.propTypes = {
  error: PropTypes.object,
  getNotifications: PropTypes.func.isRequired,
  hasUnread: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  markAllNotificationsAsRead: PropTypes.func.isRequired,
  markNotificationAsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
  senders: PropTypes.object.isRequired,
};

export default connect(
  (state) => {
    const notifications = getFilterNotifications(state, NOTIFICATION_MY);
    const senders = notifications
      .map((n) => state.entities.getIn(['tlog', String(n.get('sender'))], emptyUser));
    const hasUnread = notifications.some((n) => !n.get('readAt'));

    return {
      hasUnread,
      notifications,
      senders,
      error: state.notifications.get('error', null),
      isFetching: state.notifications.get('isFetching', false),
    };
  },
  {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  }
)(NotificationsContainer);
