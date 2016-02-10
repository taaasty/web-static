/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import UserOnboardingListItem from './UserOnboardingListItem';
import Spinner from '../../../../shared/react/components/common/Spinner';
import Scroller from '../common/Scroller';

class UserOnboardingList {
  render() {
    const { hasMore, isLoading, relationships: rels } = this.props;
    const containerClasses = classNames({
      'user-onboarding__list': true,
      '--has-more': hasMore,
    });

    return (
      <div className={containerClasses}>
        <Scroller className="scroller--persons">
          {rels.length === 0
             ? <div className="grid-full">
                 <div className="grid-full__middle">
                   {isLoading
                      ? <div className="user-onboarding__spinner-container">
                          <Spinner size={30} />
                        </div>
                      : <div className="popup__text">
                          {i18n.t('user_onboarding_empty_list')}
                        </div>
                   }
                 </div>
               </div>
             : <ul className="persons">
                 {rels.map((rel) => <UserOnboardingListItem key={rel.user_id} relationship={rel} />)}
               </ul>
          }
        </Scroller>
      </div>
    );
  }
}

UserOnboardingList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  relationships: PropTypes.array.isRequired,
};

UserOnboardingList.defaultProps = {
  relationships: [],
};

export default UserOnboardingList;
