/*global i18n */
import React, { PropTypes } from 'react';
import TitlePublicConversationActions from './TitlePublicConversationActions';

function TitlePublicConversation({ conversation }) {
  function title() {
    const { text, title } = conversation.entry;

    return title || text || i18n.t('messages_entry_title');
  }

  function status() {
    const { users, users_deleted } = conversation;
    const activeUsers = users
            .filter((u) => users_deleted.indexOf(u.id) < 0);
    
    return i18n.t('messenger.title_status.members', { count: activeUsers.length });
  }

  return (
    <div className="messages__popup-title --with-actions">
      <div className="messages__popup-title-text">
        {title()}
      </div>
      <div className="messages__popup-title-text --status-text">
        {status()}
      </div>
      <TitlePublicConversationActions conversation={conversation} />
    </div>
  );
}

TitlePublicConversation.displayName = 'TitlePublicConversation';

TitlePublicConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default TitlePublicConversation;
