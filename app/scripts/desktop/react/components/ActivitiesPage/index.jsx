import React, { Component, PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import ActivitiesPage from './ActivitiesPage';
import { setBodyLayoutClassName } from '../../helpers/htmlHelpers';

const navFilters = [
  {
    href: Routes.activities(),
    filterTitle: 'activities.filter.all',
  },
  {
    href: Routes.activitiesMy(),
    filterTitle: 'activities.filter.my',
  },
];

class ActivitiesPageContainer extends Component {
  componentDidMount() {
    setBodyLayoutClassName('layout--feed');
  }
  render() {
    const navFilterActive = 0;

    return (
      <ActivitiesPage
        activities={[]}
        loadMoreEntries={() => {}}
        navFilterActive={navFilterActive}
        navFilterItems={navFilters}
      />
    );
  }
}

ActivitiesPageContainer.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ActivitiesPageContainer;
