import React, { PropTypes } from 'react';
import UserAvatar from '../UserAvatar';

function PersonItem({ children, user }) {

  return (
    <li className="person">
      <div className="person__in">
        <div className="person__avatar">
          <a href={user.tlog_url}>
            <UserAvatar size={48} user={user} />
          </a>
        </div>
        <div className="person__desc">
          <a href={user.tlog_url}>
            <p className="person__name">
              {user.name}
            </p>
          </a>
          <div className="person__count">
            <span>
              {user.public_entries_count}
              {i18n.t('entries_count', { count: user.public_entries_count })}
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
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  user: PropTypes.object.isRequired,
};

export default PersonItem;
