import React, { PropTypes } from 'react';
import ItemEntryPreviewImage from '../Conversations/List/ItemEntryPreviewImage';
import Avatar from '../../../../../../shared/react/components/common/Avatar';
import { CONVERSATION_PIC_SIZE } from '../Conversations/List/Item';

function GroupConversationHeader({ conversation, onClick }) {
  const { avatar, topic, users, users_left, users_deleted } = conversation;
  const activeUsers = users
          .filter((u) => users_left.indexOf(u.id) < 0)
          .filter((u) => users_deleted.indexOf(u.id) < 0);
  const userpic = {
    default_colors: {
      background: '#2ac67e',
      name: '#fff',
    },
    symbol: topic[0],
  };

  return (
    <div className="messages__dialog messages__dialog--discussion" onClick={onClick}>
      <div className="messages__user-avatar">
        {avatar && avatar.url
         ? <ItemEntryPreviewImage image={avatar} />
         : <Avatar size={CONVERSATION_PIC_SIZE} userpic={userpic} />
        }
      </div>
      <div className="messages__dialog-text --group-header">
        <div className="messages__entry-data-container">
          <div className="messages__user-name">
            {topic}
          </div>
          <div className="messages__entry-text">
            {i18n.t('messenger.group.users', { count: activeUsers.length })}
          </div>
        </div>
      </div>
    </div>
  );
}

GroupConversationHeader.displayName = 'GroupConversationHeader';

GroupConversationHeader.propTypes = {
  conversation: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GroupConversationHeader;
