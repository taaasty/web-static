/*global i18n */
import React, { PropTypes } from 'react';
import TitleGroupConversationActions from './TitleGroupConversationActions';
import { getLastTyping } from './Conversations/List/ItemMain';

function TitleGroupConversation({ conversation }) {
  function status() {
    const { typing, users, users_left, users_deleted } = conversation;
    const activeUsers = users
            .filter((u) => users_left.indexOf(u.id) < 0)
            .filter((u) => users_deleted.indexOf(u.id) < 0);
    const lastTyping = getLastTyping(typing, users);
    
    return lastTyping
         ? i18n.t('messenger.is_typing', { name: lastTyping.name })
         : i18n.t('messenger.title_status.members', { count: activeUsers.length });
  }

  return (
    <div className="messages__popup-title --with-actions">
      <div className="messages__popup-title-text">
        {conversation.topic}
      </div>
      <div className="messages__popup-title-text --status-text">
        {status()}
      </div>
      <TitleGroupConversationActions conversation={conversation} />
    </div>
  );
}

TitleGroupConversation.displayName = 'TitleGroupConversation';

TitleGroupConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default TitleGroupConversation;
