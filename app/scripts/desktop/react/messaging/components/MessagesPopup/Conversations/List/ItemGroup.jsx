import React, { Component, PropTypes } from 'react';
import UserAvatar from '../../../../../components/UserAvatar';
import Avatar from '../../../../../../../shared/react/components/common/Avatar';
import ItemMain from './ItemMain';
import ItemEntryPreviewImage from './ItemEntryPreviewImage';
import { CONVERSATION_PIC_SIZE } from './Item';

class ItemGroup extends Component {
  render() {
    const { conversation: { avatar, created_at, last_message, not_disturb, topic, unread_messages_count },
            hasUnread, hasUnreceived, onClick } = this.props;
    const lastMessageAt = last_message ? last_message.created_at : created_at;
    const userpic = {
      default_colors: {
        background: '#2ac67e',
        name: '#fff',
      },
      symbol: topic[0],
    };

    return (
      <ItemMain
        hasUnread={hasUnread}
        hasUnreceived={hasUnreceived}
        isMuted={not_disturb}
        lastMessageAt={lastMessageAt}
        onClick={onClick}
        unreadCount={unread_messages_count}
      >
        <span className="messages__user-avatar">
          {avatar && avatar.url
           ? <ItemEntryPreviewImage image={avatar} />
           : <Avatar size={CONVERSATION_PIC_SIZE} userpic={userpic} />
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
