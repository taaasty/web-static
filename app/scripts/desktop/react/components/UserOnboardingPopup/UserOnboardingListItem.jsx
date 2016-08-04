import React, { PropTypes } from 'react';
import UserAvatar from '../UserAvatar';
import RelationButton from '../RelationButton';
import { Link } from 'react-router';
import uri from 'urijs';

function UserOnboardingListItem({ relId, relation }) {
  const user = relation.get('user');
  const tlogUrl = uri(user.get('tlogUrl', '')).path();

  return (
    <li className="person">
      <div className="person__in">
        <div className="person__avatar">
          <Link to={tlogUrl}>
            <UserAvatar size={48} user={user.toJS()} />
          </Link>
        </div>
        <div className="person__desc">
          <Link to={tlogUrl}>
            <p className="person__name">
              {user.get('name', '')}
            </p>
          </Link>
          <div className="person__count">
            {user.get('title', '')}
          </div>
        </div>
        <div className="person__actions">
          <RelationButton relId={relId} />
        </div>
      </div>
    </li>
  );
}

UserOnboardingListItem.propTypes = {
  relId: PropTypes.string.isRequired,
  relation: PropTypes.object.isRequired,
};

export default UserOnboardingListItem;
