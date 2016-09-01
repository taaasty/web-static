import React, { PropTypes } from 'react';
import UserAvatar from '../UserAvatar';
import { Link } from 'react-router';
import uri from 'urijs';

function ActivityItemWrapper(props) {
  const {
    children,
    date,
    text,
    user,
  } = props;
  const tlogUrl = uri(user.get('tlogUrl', '')).path();

  return (
    <div className="activity-item">
      <div className="activity-item__header">
        <div className="activity-item__avatar-container">
          <Link to={tlogUrl}>
            <UserAvatar size={50} user={user.toJS()} />
          </Link>
        </div>
        <div className="activity-item__title-container">
          <div className="activity-item__title">
            <Link to={tlogUrl}>
              {user.get('slug', '')}
            </Link>
            {' '}
            {text}
          </div>
          <div className="activity-item__created-at">
            {date}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

ActivityItemWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  date: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,
  user: PropTypes.object.isRequired,
};

export default ActivityItemWrapper;
