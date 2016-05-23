/*global i18n */
import React, { PropTypes } from 'react';
import TitlePublicConversationActions from './TitlePublicConversationActions';
import { getLastTyping } from './Conversations/List/ItemMain';
import ConversationsListItemEntryPic from './Conversations/List/ItemEntryPic';
import { TITLE_AVATAR_SIZE } from './TitlePrivateConversation';

function TitlePublicConversation({ conversation }) {
  function title() {
    const { text, title } = conversation.entry;

    return title || text || i18n.t('messages_entry_title');
  }

  function status() {
    const { typing, users, users_deleted } = conversation;
    const activeUsers = users
            .filter((u) => users_deleted.indexOf(u.id) < 0);
    const lastTyping = getLastTyping(typing, users);
    
    return lastTyping
         ? i18n.t('messenger.is_typing', { name: lastTyping.name })
         : i18n.t('messenger.title_status.members', { count: activeUsers.length });
  }

  return (
    <div className="messages__popup-title --public-conversation --with-actions">
      <div className="messages__popup-title-wrapper">
        <span className="messages__user-avatar">
          <ConversationsListItemEntryPic
            entry={conversation.entry}
            size={TITLE_AVATAR_SIZE}
            title={title()}
          />
        </span>
        <div className="messages__popup-title-text">
          {title()}
        </div>
        <div className="messages__popup-title-text --status-text">
          {status()}
        </div>
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
