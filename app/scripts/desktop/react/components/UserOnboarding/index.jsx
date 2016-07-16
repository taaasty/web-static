/*global i18n */
import React, { Component, PropTypes } from 'react';
import UserOnboardingList from './UserOnboardingList';
import UserOnboardingMoreButton from './UserOnboardingMoreButton';
import { connect } from 'react-redux';
import { loadOnboarding } from '../../actions/UserOnboardingActions';
import { List, Map } from 'immutable';

const emptyRelations = List();
const emptyRel = Map();
const emptyRelUser = Map();

const RELS_PER_PAGE = 6;

class UserOnboarding extends Component {
  state = { page: 0 };
  componentWillMount() {
    this.props.loadOnboarding();
  }
  showMore() {
    this.setState({ page: this.state.page + 1 });
  }
  render() {
    const { isFetching, relations } = this.props;
    const { page } = this.state;
    const visibleRelations = relations.take((page + 1) * RELS_PER_PAGE);
    const hasMore = (page + 1) * RELS_PER_PAGE < relations.count();

    return (
      <div className="user-onboarding">
        <div className="user-onboarding__header">
          {i18n.t('user_onboarding_header')}
        </div>
        <div className="user-onboarding__body">
          <UserOnboardingList
            hasMore={hasMore}
            isFetching={isFetching}
            relations={visibleRelations}
          />
          {hasMore && <UserOnboardingMoreButton isFetching={isFetching} showMore={this.showMore.bind(this)} />}
        </div>
      </div>
    );
  }
}

UserOnboarding.propTypes = {
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  loadOnboarding: PropTypes.func.isRequired,
  relations: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    isFetching: state.userOnboarding.get('isFetching', false),
    error: state.userOnboarding.get('error', null),
    relations: state.userOnboarding
      .getIn([ 'data', 'relations' ], emptyRelations)
      .toOrderedMap()
      .mapEntries(([ idx, relId ]) => state.entities.getIn([ 'rel', relId ], emptyRel))
      .map((r) => r.set('user', state.entities.getIn([ 'tlog', r.get('userId') ], emptyRelUser))),
  }),
  { loadOnboarding }
)(UserOnboarding);
