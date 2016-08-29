import React, { Component, PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import ActivitiesPage from './ActivitiesPage';
import { setBodyLayoutClassName } from '../../helpers/htmlHelpers';
import { connect } from 'react-redux';
import {
  NOTIFICATION_MY,
  NOTIFICATION_FRIEND,
  getFilterNotifications,
  getNotifications,
  prependNotifications,
} from '../../actions/NotificationsActions';

const filters = [
  {
    href: Routes.activities(),
    filterTitle: 'activities.filter.all',
    filter: NOTIFICATION_FRIEND,
  },
  {
    href: Routes.activitiesMy(),
    filterTitle: 'activities.filter.my',
    filter: NOTIFICATION_MY,
  },
];

class ActivitiesPageContainer extends Component {
  componentWillMount() {
    const {
      filter,
      hasMore,
      getNotifications,
    } = this.props;

    if (hasMore) {
      getNotifications(filter);
    } else {
      prependNotifications(filter);
    }
  }
  componentDidMount() {
    setBodyLayoutClassName('layout--feed');
  }
  componentWillReceiveProps(nextProps) {
    const {
      filter,
      prependNotifications,
    } = this.props;
    const {
      filter: nextFilter,
    } = nextProps;

    if (filter !== nextFilter) {
      prependNotifications(nextFilter);
    }
  }
  render() {
    const {
      activeIdx,
      filter,
      hasMore,
      isFetching,
      notifications,
      getNotifications,
    } = this.props;

    return (
      <ActivitiesPage
        entries={notifications}
        hasMore={hasMore}
        isFetching={isFetching}
        loadMoreEntries={getNotifications.bind(void 0, filter)}
        navFilterActive={activeIdx}
        navFilterItems={filters}
      />
    );
  }
}

ActivitiesPageContainer.propTypes = {
  activeIdx: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  getNotifications: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
  prependNotifications: PropTypes.func.isRequired,
};

export default connect(
  (state, { location }) => {
    const activeIdx = {}.hasOwnProperty.call(location.query, 'my') ? 1 : 0;
    const { filter } = filters[activeIdx];
    const notifications = getFilterNotifications(state, filter);
    const totalFilterCount = state
      .notifications
      .getIn(['totalCount', filter], +Infinity);
    const isFetching = state.notifications.get('isFetching', false);

    return {
      activeIdx,
      filter,
      isFetching,
      notifications,
      hasMore: totalFilterCount > notifications.count(),
    };
  },
  {
    getNotifications,
    prependNotifications,
  }
)(ActivitiesPageContainer);
