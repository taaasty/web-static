/*global i18n */
import React, { Component, PropTypes } from 'react';
import UserOnboardingList from './UserOnboardingList';
import UserOnboardingMoreButton from './UserOnboardingMoreButton';
import UserOnboardingStore from '../../stores/UserOnboardingStore';
import * as UserOnboardingActions from '../../actions/UserOnboardingActions';

const RELS_PER_PAGE = 6;

class UserOnboarding extends Component {
  state = Object.assign({}, this.getStoreState(), { page: 0 })
  componentWillMount() {
    const { isLoading, relationships: rels } = this.state;
    this.sync = this._syncWithStore.bind(this);
    UserOnboardingStore.addChangeListener(this.sync);
    if (rels.length === 0 && !isLoading) {
      UserOnboardingActions.load();
    }
  }
  componentWillUnmount() {
    UserOnboardingStore.removeChangeListener(this.sync);
  }
  getStoreState() {
    return UserOnboardingStore.getState();
  }
  _syncWithStore() {
    this.setState(this.getStoreState());
  }
  showMore() {
    this.setState({ page: this.state.page + 1 });
  }
  render() {
    const { isLoading, page, relationships } = this.state;
    const relationshipsPage = relationships.slice(0, (page + 1) * RELS_PER_PAGE);
    const hasMore = (page + 1) * RELS_PER_PAGE < relationships.length;

    return (
      <div className="user-onboarding">
        <div className="user-onboarding__header">
          {i18n.t('user_onboarding_header')}
        </div>
        <div className="user-onboarding__body">
          <UserOnboardingList isLoading={isLoading} relationships={relationshipsPage} />
          <div className="popup__more">
            {hasMore && <UserOnboardingMoreButton isLoading={isLoading} showMore={this.showMore.bind(this)} />}
          </div>
        </div>
      </div>
    );
  }
}

export default UserOnboarding;
