import React, { Component, PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import ActivitiesPage from './ActivitiesPage';
import { setBodyLayoutClassName } from '../../helpers/htmlHelpers';

const filters = [
  {
    href: Routes.activities(),
    filterTitle: 'activities.filter.all',
    filter: 'FriendActivityNotification',
  },
  {
    href: Routes.activitiesMy(),
    filterTitle: 'activities.filter.my',
    filter: 'ActivityNotification',
  },
];

class ActivitiesPageContainer extends Component {
  componentWillMount() {
    const { filter } = filters[this.activeFilterIdx((this.props))];

    this.props.getActivitiesIfNeeded(filter);
  }
  componentDidMount() {
    setBodyLayoutClassName('layout--feed');
  }
  activeFilterIdx(props) {
    return {}.hasOwnProperty.call(props.location.query, 'my') ? 1 : 0;
  }
  render() {
    const active = this.activeFilterIdx(this.props);

    return (
      <ActivitiesPage
        activities={[]}
        loadMoreEntries={() => {}}
        navFilterActive={active}
        navFilterItems={filters}
      />
    );
  }
}

ActivitiesPageContainer.propTypes = {
  getActivitiesIfNeeded: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default ActivitiesPageContainer;
