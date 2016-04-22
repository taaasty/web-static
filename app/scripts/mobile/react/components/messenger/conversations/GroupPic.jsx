import React, { PropTypes } from 'react';
import Avatar from '../../common/avatar/avatar';
import PreviewImage from './PreviewImage';
import { CONVERSATION_PIC_SIZE } from './ConversationListItem';

function GroupPic({ avatar, topic }) {
  const userpic = {
    default_colors: {
      background: '#2ac67e',
      name: '#fff',
    },
    symbol: topic[0],
  };

  return (avatar && avatar.url)
    ? <PreviewImage image={avatar} />
    : <Avatar size={CONVERSATION_PIC_SIZE} userpic={userpic} />;
}

GroupPic.displayName = 'GroupPic';

GroupPic.propTypes = {
  avatar: PropTypes.object,
  topic: PropTypes.string.isRequired,
};

export default GroupPic;
