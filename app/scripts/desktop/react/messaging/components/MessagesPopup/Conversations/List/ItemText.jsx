import React, { Component, PropTypes } from 'react';
import UserAvatar from '../../../../../components/UserAvatar';
import ItemMain from './ItemMain';
import { CONVERSATION_PIC_SIZE } from './Item';

class ItemText extends Component {
  render() {
    const { conversation: { created_at, last_message, recipient, online, unread_messages_count },
            hasUnread, hasUnreceived, onClick } = this.props;
    const lastMessageText = last_message ? last_message.content_html : '';
    const lastMessageAt = last_message ? last_message.created_at : created_at;

    return (
      <ItemMain
        hasUnread={hasUnread}
        hasUnreceived={hasUnreceived}
        lastMessageAt={lastMessageAt}
        onClick={onClick}
        unreadCount={unread_messages_count}
      >
        <span className="messages__user-avatar">
          <UserAvatar size={CONVERSATION_PIC_SIZE} user={recipient} />
          {online && <span className="messages__user-online" />}
        </span>
        <div className="messages__dialog-text">
          <div className="messages__user-name">
            {recipient.slug}
          </div>
          {lastMessageText &&
           <div
             className="messages__last-message"
             dangerouslySetInnerHTML={{ __html: lastMessageText }}
           />}
        </div>
      </ItemMain>
    );
  }
}

ItemText.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ItemText;
