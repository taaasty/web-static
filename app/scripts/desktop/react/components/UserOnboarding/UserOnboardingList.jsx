/*global i18n */
import React, { PropTypes } from 'react';
import UserOnboardingListItem from './UserOnboardingListItem';
import Spinner from '../../../../shared/react/components/common/Spinner';
import Scroller from '../common/scroller/scroller';

class UserOnboardingList {
  render() {
    const { isLoading, users } = this.props;

    return (
      <div className="user-onboarding__list">
        <Scroller className="scroller--persons">
          {users.length === 0
             ? <din className="grid-full">
                 <div className="grid-full__middle">
                   {isLoading
                      ? <Spinner size={30} />
                      : <div className="popup__text">
                          {i18n.t('user_onboarding_empty_list')}
                        </div>
                   }
                 </div>
               </div>
             : <ul className="persons">
                 {users.map((user) => <UserOnboardingListItem key={user.id} user={user} />)}
               </ul>
          }
        </Scroller>
      </div>
    );
  }
}

UserOnboardingList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

UserOnboardingList.defaultProps = {
  users: [],
};

export default UserOnboardingList;
