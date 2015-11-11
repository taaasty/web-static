/*global i18n */
import React, { Component, PropTypes } from 'react';
import UserOnboardingList from './UserOnboardingList';
import UserOnboardingMoreButton from './UserOnboardingMoreButton';
import UserOnboardingStore from '../../stores/UserOnboardingStore';
import UserOnboardingActions from '../../actions/UserOnboardingActions';

class UserOnboarding extends Component {
  state = this._syncWithStore()
  componentWillMount() {
    const { isLoading, users } = this.state;
    this.sync = this._syncWithStore.bind(this);
    UserOnboardingStore.addChangeListener(this.sync);
    if (users.length === 0 && !isLoading) {
      this.loadMore();
    }
  }
  componentWillUnmount() {
    UserOnboardingStore.removeChangeListener(this.sync);
  }
  _syncWithStore() {
    return UserOnboardingStore.getState();
  }
  loadMore() {
    UserOnboardingActions.loadMore();
  }
  render() {
    const { isLoading, status, users } = this.state;
    return (
      <div className="user-onboarding">
        <div className="user-onboarding__header">
          {i18n.t('user_onboarding_header')}
        </div>
        <div className="user-onboarding__body">
          <UserOnboardingList isLoading={isLoading} users={users} />
          {hasMore && <UserOnboardingMoreButton isLoading={isLoading} loadMore={this.loadMore} />}
        </div>
      </div>
    );
  }
}

export default UserOnboarding;
