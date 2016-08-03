import React, { Component, PropTypes } from 'react';
import Notifications from './Notifications';
import { connect } from 'react-redux';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../../actions/NotificationsActions';
import { Map } from 'immutable';
import moment from 'moment';

class NotificationsContainer extends Component {
  componentWillMount() {
    this.props.getNotifications();
  }
  componentWillUnmount() {
    const { hasUnread, markAllNotificationsAsRead } = this.props;

    if (hasUnread) {
      markAllNotificationsAsRead();
    }
  }
  render() {
    return <Notifications {...this.props} />;
  }
}

NotificationsContainer.propTypes = {
  error: PropTypes.object,
  getNotifications: PropTypes.func.isRequired,
  hasUnread: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  markAllNotificationsAsRead: PropTypes.func.isRequired,
  markNotificationAsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
};

export default connect(
  (state) => {
    const currentUserId = state.currentUser.data.id;
    const notifications = state.entities
      .get('notification', Map())
      .filter((n) => n.get('userId') === currentUserId)
      .toOrderedMap()
      .sortBy((n) => -moment(n.get('createdAt')))
      .map((n) => n.set('sender', state.entities.getIn(['tlog', String(n.get('sender'))], Map())));
    const hasUnread = notifications.some((n) => !n.get('readAt'));

    return {
      hasUnread,
      notifications,
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
