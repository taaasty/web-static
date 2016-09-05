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
import { List, Map } from 'immutable';

const emptyList = List();
const emptyPerson = Map();

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
      people,
      isFetching,
      peopleRecommended,
      isFetchingRecommended,
      isPremium,
      location,
      routeParams,
      showGetPremiumPopup,
    } = this.props;
    const { sort, query } = getParams(location, routeParams);

    return (
      <div className="page__inner">
        <div className="page__pager">
          <Helmet title={i18n.t('people.title') + ' - ' + i18n.t(`people.${sort}.title`)} />
          <div className="page-body">
            <div className="layout-outer people-layout">
              <div className="people-wrapper">
                <PeopleRecommended
                  isFetching={isFetchingRecommended}
                  isPremium={isPremium}
                  people={peopleRecommended}
                  showGetPremiumPopup={showGetPremiumPopup}
                />
                <PeopleNav
                  active={sorts.indexOf(sort)}
                  sorts={sorts}
                />
                <PeopleList
                  isFetching={isFetching}
                  people={people}
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
  isFetching: PropTypes.bool.isRequired,
  isFetchingRecommended: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  peopleRecommended: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  showGetPremiumPopup: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    people: state
      .people
      .get('ids', emptyList)
      .map((r) => state.entities.getIn([ 'tlog', String(r.get('user')) ], emptyPerson)),
    peopleRecommended: state
      .people
      .get('idsRecommended', emptyList)
      .map((r) => state.entities.getIn([ 'tlog', String(r.get('user')) ], emptyPerson)),
    isFetching: state
      .people
      .get('isFetching'),
    isFetchingRecommended: state
      .people
      .get('isFetchingRecommended'),
    isPremium: !!state.currentUser.data.isPremium,
  }),
  { getPeopleIfNeeded, getRecommendedPeople, showGetPremiumPopup }
)(PeoplePage);
