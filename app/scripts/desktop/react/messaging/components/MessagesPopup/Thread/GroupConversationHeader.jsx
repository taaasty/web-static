import React, { PropTypes } from 'react';
import ItemEntryPreviewImage from '../Conversations/List/ItemEntryPreviewImage';

function GroupConversationHeader({ conversation, onClick }) {
  const { avatar, topic, users, users_left } = conversation;
  const activeUsers = users.filter((u) => users_left.indexOf(u.id) < 0)

  return (
    <div className="messages__dialog messages__dialog--discussion" onClick={onClick}>
      <div className="messages__user-avatar">
        {avatar && avatar.url
         ? <ItemEntryPreviewImage image={avatar} />
         : <i className="icon icon--instagram-circle --group-default" />
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
