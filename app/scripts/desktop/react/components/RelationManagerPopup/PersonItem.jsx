/*global i18n */
import React, { PropTypes } from 'react';
import UserAvatar from '../UserAvatar/new';
import { Link } from 'react-router';
import uri from 'urijs';

function PersonItem({ children, user }) {
  const userPath = uri(user.get('tlogUrl', '')).path();
  const publicEntriesCount = user.get('publicEntriesCount');

  return (
    <li className="person">
      <div className="person__in">
        <div className="person__avatar">
          <Link to={userPath}>
            <UserAvatar size={48} user={user.toJS()} />
          </Link>
        </div>
        <div className="person__desc">
          <Link to={userPath}>
            <p className="person__name">
              {user.get('name', '')}
            </p>
          </Link>
          <div className="person__count">
            <span>
              {publicEntriesCount}
              {' '}
              {i18n.t('entries_count', { count: publicEntriesCount })}
            </span>
          </div>
        </div>
        <div className="person__actions">
          {children}
        </div>
      </div>
    </li>
  );
}

PersonItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  user: PropTypes.object.isRequired,
};

export default PersonItem;
