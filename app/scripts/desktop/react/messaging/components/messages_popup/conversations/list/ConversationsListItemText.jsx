import React, { PropTypes } from 'react';
import UserAvatar from '../../../../../components/avatars/UserAvatar';
import ConversationsListItem from './ConversationsListItem';

class ConversationsListItemText {
  render() {
    const { conversation: { created_at, last_message, recipient, online, unread_messages_count },
            hasUnread, hasUnreceived, onClick } = this.props;
    const lastMessageText = last_message ? last_message.content_html : '';
    const lastMessageAt = last_message ? last_message.created_at : created_at;

    return (
      <ConversationsListItem
        hasUnread={hasUnread}
        hasUnreceived={hasUnreceived}
        lastMessageAt={lastMessageAt}
        onClick={onClick}
        unreadCount={unread_messages_count}
      >
        <span className="messages__user-avatar">
          <UserAvatar size={35} user={recipient} />
          {online && <span className="messages__user-online" />}
        </span>
        <div className="messages__dialog-text">
          <div className="messages__user-name">
            {recipient.slug}
          </div>
          {lastMessageText && <div dangerouslySetInnerHTML={{ __html: lastMessageText }} />}
        </div>
      </ConversationsListItem>
    );
  }
}

ConversationsListItemText.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ConversationsListItemText;
