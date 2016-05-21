import React, { Component, PropTypes } from 'react';
import MsgUserAvatar from '../../MsgUserAvatar';
import Avatar from '../../../../../../../shared/react/components/common/Avatar';
import ItemMain, { getLastMsgTxt, getLastTyping } from './ItemMain';
import ItemEntryPreviewImage from './ItemEntryPreviewImage';
import { CONVERSATION_PIC_SIZE } from './Item';

class ItemGroup extends Component {
  render() {
    const { conversation: { avatar, created_at, last_message, not_disturb,
                            topic, typing, unread_messages_count, users },
            hasUnread, hasUnreceived, onClick } = this.props;
    const lastMessageAt = last_message ? last_message.created_at : created_at;
    const userpic = {
      default_colors: {
        background: '#2ac67e',
        name: '#fff',
      },
      symbol: topic[0],
    };
    const lastTyping = getLastTyping(typing, users);
    const lastMsg = lastTyping
            ? { user: lastTyping, content: i18n.t('messenger.typing') }
            : last_message && { user: last_message.author, content: getLastMsgTxt(last_message) };

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
          {lastMsg &&
           <div className="messages__last-message">
             <MsgUserAvatar size={20} user={lastMsg.user} />
             <span dangerouslySetInnerHTML={{ __html: lastMsg.content }} />
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
