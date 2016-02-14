import React, { Component, PropTypes } from 'react';
import UserAvatar from '../../../../../components/UserAvatar';
import ItemMain from './ItemMain';
import ItemEntryPreviewImage from './ItemEntryPic';

class ItemGroup extends Component {
  render() {
    const { conversation: { avatar, created_at, last_message, topic, unread_messages_count },
            hasUnread, hasUnreceived, onClick } = this.props;
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
          {avatar && avatar.url
           ? <ItemEntryPreviewImage image={avatar} />
           : <i className="icon icon--instagram-circle" />
          }
        </span>
        <div className="messages__dialog-text">
          <div className="messages__user-name">
            {topic}
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

ItemGroup.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ItemGroup;
