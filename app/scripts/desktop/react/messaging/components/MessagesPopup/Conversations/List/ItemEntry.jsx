/*global i18n */
import React, { Component, PropTypes } from 'react';
import UserAvatar from '../../../../../components/UserAvatar';
import ItemMain from './ItemMain';
import ItemEntryPic from './ItemEntryPic';

class ItemEntry extends Component {
  render() {
    const { conversation: { created_at, entry, last_message, unread_messages_count },
            hasUnread, hasUnreceived, onClick } = this.props;
    const title = (entry && (entry.title || entry.text)) || i18n.t('messages_public_conversation_title');
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
          <ItemEntryPic entry={entry} title={title} />
        </span>
        <div className="messages__dialog-text">
          <div className="messages__user-name">
            {title}
          </div>
          {last_message &&
           <div className="messages__last-message">
             <UserAvatar size={20} user={last_message.author} />
             <span dangerouslySetInnerHTML={{ __html: last_message.content_html }} />
           </div>
          }
        </div>
      </ItemMain>
    );
  }
}

ItemEntry.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ItemEntry;
