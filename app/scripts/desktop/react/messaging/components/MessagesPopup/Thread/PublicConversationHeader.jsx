/*global i18n */
import React, { PropTypes } from 'react';
import ConversationsListItemEntryPic from '../Conversations/List/ItemEntryPic';
import PublicConversationActions from './PublicConversationActions';

function PublicConversationHeader(props) {
  const { conversation, onClick, url } = props;
  const { title, text } = conversation.entry;

  return (
    <div className="messages__dialog messages__dialog--discussion">
      <a href={url} onClick={onClick}>
        <span className="messages__user-avatar">
          <ConversationsListItemEntryPic entry={conversation.entry} />
        </span>
        <div className="messages__dialog-text --public-header">
          <div className="messages__entry-data-container">
            <div className="messages__user-name">
              {title || text || i18n.t('messages_public_conversation_title')}
            </div>
            {(title && text) &&
            <div
              className="messages__entry-text"
              dangerouslySetInnerHTML={{ __html: text }}
            />}
          </div>
        </div>
      </a>
      <PublicConversationActions conversation={conversation} />
    </div>
  );
}

PublicConversationHeader.propTypes = {
  conversation: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  url: PropTypes.string,
};

PublicConversationHeader.defaultProps = {
  conversation: {
    last_message: {
      author: {
        userpic: {},
      },
    },
  },
};

export default PublicConversationHeader;
