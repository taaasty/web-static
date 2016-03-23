/*global i18n */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getPeopleIfNeeded } from '../../actions/PeopleActions';
import { appStateSetSearchKey } from '../../actions/AppStateActions';
import FeedHeader from '../common/FeedHeader';
import PeopleNav from './PeopleNav';
import PeopleList from './PeopleList';
import { SEARCH_KEY_PEOPLE } from '../../constants/SearchConstants';

export const sorts = [ 'posts', 'followers', 'interested', 'worst', 'comments', 'new', 'bad' ];

function getParams({ query }, { sort }) {
  return {
    query: (query && query.q) || void 0,
    sort: sorts.indexOf(sort) > -1 ? sort : 'posts',
  }
}

class PeoplePage extends Component {
  componentWillMount() {
    const { appStateSetSearchKey, getPeopleIfNeeded, location, routeParams } = this.props;

    getPeopleIfNeeded(getParams(location, routeParams));
    appStateSetSearchKey(SEARCH_KEY_PEOPLE);
  }
  componentDidMount() {
    document.body.className = 'layout--feed';
  }
  componentWillReceiveProps(nextProps) {
    const { location, routeParams } = nextProps;
    const {appStateSetSearchKey, getPeopleIfNeeded } = this.props;

    getPeopleIfNeeded(getParams(location, routeParams));
    appStateSetSearchKey(SEARCH_KEY_PEOPLE);
  }
  render() {
    const { currentUser, location, people: { data: items, isFetching, query }, routeParams } = this.props;
    const { sort } = getParams(location, routeParams);

    return (
      <div className="page__inner">
        <div className="page__pager">
          <Helmet title={i18n.t('people.title') + ' - ' + i18n.t(`people.${sort}.title`)} />
          <FeedHeader
            bgImage={currentUser.design && currentUser.design.backgroundImageUrl}
            text={i18n.t(`people.${sort}.text`)}
            title={i18n.t(`people.${sort}.title`)}
          />
          <div className="page-body">
            <div className="layout-outer">
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
    );
  }
}

PeoplePage.displayName = 'PeoplePage';

PeoplePage.propTypes = {
  appStateSetSearchKey: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  getPeopleIfNeeded: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    currentUser: state.currentUser.data,
    people: state.people,
  }),
  { appStateSetSearchKey, getPeopleIfNeeded }
)(PeoplePage);
