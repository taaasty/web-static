/*global i18n */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getPeopleIfNeeded, getRecommendedPeople } from '../../actions/PeopleActions';
import { showGetPremiumPopup } from '../../actions/AppStateActions';
import PeopleNav from './PeopleNav';
import PeopleList from './PeopleList';
import PeopleRecommended from './PeopleRecommended';
import { setBodyLayoutClassName } from '../../helpers/htmlHelpers';
import CurrentUserStore from '../../stores/current_user';

export const sorts = [ 'posts', 'followers', 'interested', 'worst', 'comments', 'new', 'bad' ];

function getParams({ query }, { sort }) {
  return {
    query: (query && query.q) || void 0,
    sort: sorts.indexOf(sort) > -1 ? sort : 'posts',
  };
}

class PeoplePage extends Component {
  componentWillMount() {
    const { getPeopleIfNeeded, getRecommendedPeople, location, routeParams } = this.props;

    getPeopleIfNeeded(getParams(location, routeParams));
    getRecommendedPeople();
  }
  componentDidMount() {
    setBodyLayoutClassName('layout--feed');
  }
  componentWillReceiveProps(nextProps) {
    const { location, routeParams } = nextProps;
    const { getPeopleIfNeeded, getRecommendedPeople } = this.props;

    getPeopleIfNeeded(getParams(location, routeParams));
    if (location.pathname !== nextProps.location.pathname) {
      getRecommendedPeople();
    }
  }
  render() {
    const {
      location,
      people: { data: items, isFetching, query, dataRecommended, isFetchingRecommended },
      routeParams,
      showGetPremiumPopup,
    } = this.props;
    const { sort } = getParams(location, routeParams);

    return (
      <div className="page__inner">
        <div className="page__pager">
          <Helmet title={i18n.t('people.title') + ' - ' + i18n.t(`people.${sort}.title`)} />
          <div className="page-body">
            <div className="layout-outer people-layout">
              <div className="people-wrapper">
                <PeopleRecommended
                  isFetching={isFetchingRecommended}
                  isPremium={CurrentUserStore.isPremium()}
                  people={dataRecommended}
                  showGetPremiumPopup={showGetPremiumPopup}
                />
                <PeopleNav
                  active={sorts.indexOf(sort)}
                  sorts={sorts}
                />
                <PeopleList
                  isFetching={isFetching}
                  people={items}
                  query={query}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PeoplePage.displayName = 'PeoplePage';

PeoplePage.propTypes = {
  getPeopleIfNeeded: PropTypes.func.isRequired,
  getRecommendedPeople: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  showGetPremiumPopup: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    people: state.people,
  }),
  { getPeopleIfNeeded, getRecommendedPeople, showGetPremiumPopup }
)(PeoplePage);
