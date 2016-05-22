/*global i18n */
import React, { PropTypes } from 'react';
import TitleGroupConversationActions from './TitleGroupConversationActions';
import { getLastTyping } from './Conversations/List/ItemMain';
import { TITLE_AVATAR_SIZE } from './TitlePrivateConversation';
import ItemEntryPreviewImage from './Conversations/List/ItemEntryPreviewImage';
import Avatar from '../../../../../shared/react/components/common/Avatar';
import { SYMBOL_AVATAR_BG, SYMBOL_AVATAR_COLOR } from '../../constants/ConversationConstants';

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

  const { avatar, topic } = conversation;
  const userpic = {
    default_colors: {
      background: SYMBOL_AVATAR_BG,
      name: SYMBOL_AVATAR_COLOR,
    },
    symbol: topic[0],
  };
  
  return (
    <div className="messages__popup-title --with-actions">
      <div className="messages__popup-title-wrapper">
        <span className="messages__user-avatar">
          {avatar && avatar.url
           ? <ItemEntryPreviewImage image={avatar} size={TITLE_AVATAR_SIZE} />
           : <Avatar size={TITLE_AVATAR_SIZE} userpic={userpic} />
          }
        </span>
        <div className="messages__popup-title-text">
          {topic}
        </div>
        <div className="messages__popup-title-text --status-text">
          {status()}
        </div>
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
