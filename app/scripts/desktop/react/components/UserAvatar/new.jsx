import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/AvatarCamelCase';

function UserAvatar({ size, user: { name, tag, userpic={} } }) {
  return (
    <Avatar
      name={tag || name}
      size={size}
      userpic={userpic}
    />
  );
}

UserAvatar.displayName = 'UserAvatar';

UserAvatar.propTypes = {
  size: PropTypes.number,
  user: PropTypes.object.isRequired,
};
  
export default UserAvatar;
