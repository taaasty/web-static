import React, { PropTypes } from 'react';
import UserAvatar from '../../../components/UserAvatar';

function MsgUserAvatar({ size, user }) {
  return (
    <div className="message-user-avatar">
      <UserAvatar size={size} user={user} />
      {user.is_online && <span className="message-user-avatar__online-badge" />}
    </div>  
  );
}

MsgUserAvatar.propTypes = {
  size: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default MsgUserAvatar;
