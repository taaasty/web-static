/*global i18n */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPeopleIfNeeded } from '../../actions/PeopleActions';
import { appStateSetSearchKey } from '../../actions/AppStateActions';
import FeedHeader from '../common/FeedHeader';
import PeopleNav from './PeopleNav';
import PeopleList from './PeopleList';
import { SEARCH_KEY_PEOPLE } from '../../constants/SearchConstants';

export const sorts = [ 'posts', 'followers', 'interested', 'worst', 'comments', 'new', 'bad' ];

function getParams({ sort }) {
  return {
    sort: sorts.indexOf(sort) > -1 ? sort : 'posts',
  }
}

class PeoplePage extends Component {
  componentWillMount() {
    const { appStateSetSearchKey, getPeopleIfNeeded, routeParams } = this.props;

    getPeopleIfNeeded(getParams(routeParams));
    appStateSetSearchKey(SEARCH_KEY_PEOPLE);
  }
  componentDidMount() {
    document.body.className = 'layout--feed';
  }
  componentWillReceiveProps(nextProps) {
    const {appStateSetSearchKey, getPeopleIfNeeded } = this.props;

    getPeopleIfNeeded(getParams(nextProps.routeParams));
    appStateSetSearchKey(SEARCH_KEY_PEOPLE);
  }
  render() {
    const { currentUser, people: { data: items, isFetching }, routeParams } = this.props;
    const { sort } = getParams(routeParams);

    return (
      <div className="page__inner">
        <div className="page__pager">
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
