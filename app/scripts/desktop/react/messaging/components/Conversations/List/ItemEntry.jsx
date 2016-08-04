/*global i18n */
import React, { PropTypes } from 'react';
import MsgUserAvatar from '../../MsgUserAvatar';
import ItemMain, { getLastMsgTxt, getLastTyping } from './ItemMain';
import ItemEntryPic from './ItemEntryPic';
import { Map } from 'immutable';

function ItemEntry(props) {
  const {
    conversation,
    hasUnread,
    hasUnreceived,
    onClick,
  } = props;
  const lastMessage = conversation.get('lastMessage', Map());
  const entry = conversation.get('entry', Map());
  const title = entry.get('title') || entry.get('text') || i18n.t('messages_public_conversation_title');
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
        <ItemEntryPic entry={entry} title={title} />
      </span>
      <div className="messages__dialog-text">
        <div className="messages__user-name">
          {title}
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

ItemEntry.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool.isRequired,
  hasUnreceived: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ItemEntry;
