/*global i18n */
import React, { PropTypes } from 'react';
import MsgUserAvatar from '../../MsgUserAvatar';
import Avatar from '../../../../../../shared/react/components/common/AvatarCamelCase';
import ItemMain, { getLastMsgTxt, getLastTyping } from './ItemMain';
import ItemEntryPreviewImage from './ItemEntryPreviewImage';
import {
  CONVERSATION_PIC_SIZE,
} from './Item';
import {
  SYMBOL_AVATAR_BG,
  SYMBOL_AVATAR_COLOR,
} from '../../../constants';
import { Map } from 'immutable';

function ItemGroup(props) {
  const {
    conversation,
    hasUnread,
    hasUnreceived,
    onClick,
  } = props;
  const lastMessage = conversation.get('lastMessage');
  const topic = conversation.get('topic');
  const avatar = conversation.get('avatar', Map());
  const userpic = {
    defaultColors: {
      background: SYMBOL_AVATAR_BG,
      name: SYMBOL_AVATAR_COLOR,
    },
    symbol: topic[0],
  };
  const lastTyping = getLastTyping(conversation.get('typing'), conversation.get('users'));
  const [ lastMsgUser, lastMsgContent ] = lastTyping
    ? [ lastTyping, i18n.t('messenger.typing') ]
    : !lastMessage.isEmpty() && [ lastMessage.get('author'), getLastMsgTxt(lastMessage) ];

  return (
    <ItemMain
      createdAt={conversation.get('createdAt')}
      hasUnread={hasUnread}
      hasUnreceived={hasUnreceived}
      isMuted={conversation.get('notDisturb')}
      lastMessage={lastMessage}
      onClick={onClick}
      unreadCount={conversation.get('unreadMessagesCount')}
      userId={conversation.get('userId')}
    >
      <span className="messages__user-avatar">
        {avatar.get('url')
         ? <ItemEntryPreviewImage image={avatar} />
         : <Avatar size={CONVERSATION_PIC_SIZE} userpic={userpic} />
        }
      </span>
      <div className="messages__dialog-text">
        <div className="messages__user-name">
          {topic}
        </div>
        {lastMsgContent &&
         <div className="messages__last-message">
           <MsgUserAvatar size={20} user={lastMsgUser} />
           <span dangerouslySetInnerHTML={{ __html: lastMsgContent }} />
         </div>
        }
      </div>
    </ItemMain>
  );
}

ItemGroup.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool.isRequired,
  hasUnreceived: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ItemGroup;
