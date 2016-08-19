import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/AvatarCamelCase';
import { TLOG_TYPE_ANONYMOUS } from '../../constants/EditorConstants';

function UserAvatar({ size, user: { name, slug, tag, userpic={} } }) {
  const tUserpic = slug === TLOG_TYPE_ANONYMOUS
    ? {
        kind: 'anonymous',
        symbol: '\ue002',
        defaultColors: {
          background: 'transparent',
          name: '#fff',
        },
      }
    : userpic;

  return (
    <Avatar
      name={tag || name}
      size={size}
      userpic={tUserpic}
    />
  );
}

UserAvatar.displayName = 'UserAvatar';

UserAvatar.propTypes = {
  size: PropTypes.number,
  user: PropTypes.object.isRequired,
};
  
export default UserAvatar;
