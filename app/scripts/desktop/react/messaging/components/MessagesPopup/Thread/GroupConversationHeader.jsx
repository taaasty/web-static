import React, { PropTypes } from 'react';
import ItemEntryPreviewImage from '../Conversations/List/ItemEntryPreviewImage';

function GroupConversationHeader({ conversation }) {
  const { avatar, topic, users } = conversation;

  return (
    <div className="messages__dialog messages__dialog--discussion">
      <div className="messages__user-avatar">
        {avatar && avatar.url
         ? <ItemEntryPreviewImage image={avatar} />
         : <i className="icon icon--instagram-circle" />
        }
      </div>
      <div className="messages__dialog-text --group-header">
        <div className="messages__entry-data-container">
          <div className="messages__user-name">
            {topic}
          </div>
          <div className="messages__entry-text">
            {i18n.t('messenger.group.users', { count: users.length })}
          </div>
        </div>
      </div>
    </div>
  );
}

GroupConversationHeader.displayName = 'GroupConversationHeader';

GroupConversationHeader.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default GroupConversationHeader;
