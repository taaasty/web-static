/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import UserOnboardingListItem from './UserOnboardingListItem';
import Spinner from '../../../../shared/react/components/common/Spinner';
import Scroller from '../common/Scroller';

function UserOnboardingList({ hasMore, isFetching, relations }) {
  const containerClasses = classNames({
    'user-onboarding__list': true,
    '--has-more': hasMore,
  });

  return (
    <div className={containerClasses}>
      <Scroller className="scroller--persons">
        {relations.count() === 0
           ? <div className="grid-full">
               <div className="grid-full__middle">
                 {isFetching
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
               {relations.map((rel, relId) => (
                  <UserOnboardingListItem
                    key={rel.get('userId')}
                    relId={relId}
                    relation={rel}
                  />
               )).valueSeq()}
             </ul>
        }
      </Scroller>
    </div>
  );
}

UserOnboardingList.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  relations: PropTypes.object.isRequired,
};

export default UserOnboardingList;
