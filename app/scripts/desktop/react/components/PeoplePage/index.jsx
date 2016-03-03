/*global i18n */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPeopleIfNeeded } from '../../actions/PeopleActions';
import FeedHeader from '../common/FeedHeader';
import PeopleNav from './PeopleNav';
import PeopleList from './PeopleList';

export const sorts = [ 'posts', 'followers', 'interested', 'worst', 'comments', 'new', 'bad' ];

function getParams({ sort }) {
  return {
    sort: sorts.indexOf(sort) > -1 ? sort : 'posts',
  }
}

class PeoplePage extends Component {
  componentWillMount() {
    this.props.getPeopleIfNeeded(getParams(this.props.routeParams));
  }
  componentWillReceiveProps(nextProps) {
    this.props.getPeopleIfNeeded(getParams(nextProps.routeParams));
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
  { getPeopleIfNeeded }
)(PeoplePage);
