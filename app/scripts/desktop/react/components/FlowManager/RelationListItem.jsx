/*global i18n */
import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/AvatarCamelCase';
import { Link } from 'react-router';
import uri from 'urijs';

function RelationListItem({ children, user }) {
  if (user.isEmpty()) {
    return <noscript />;
  }

  const tlogUrl = uri(user.get('tlogUrl', '')).path();

  return (
    <li className="person">
      <div className="person__in">
        <div className="person__avatar">
          <Link to={tlogUrl}>
            <Avatar size={48} userpic={user.get('userpic').toJS()} />
          </Link>
        </div>
        <div className="person__desc">
          <Link to={tlogUrl}>
            <p className="person__name">
              {user.get('name')}
            </p>
          </Link>
          <div className="person__count">
            {i18n.t('tlog.entries_count', { count: user.get('publicEntriesCount', 0) })}
          </div>
        </div>
        <div className="person__actions">
          {children}
        </div>
      </div>
    </li>
  );
}

RelationListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  user: PropTypes.object.isRequired,
};

export default RelationListItem;
