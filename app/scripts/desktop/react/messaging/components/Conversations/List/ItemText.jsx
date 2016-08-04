/*global i18n */
import React, { PropTypes } from 'react';
import MsgUserAvatar from '../../MsgUserAvatar';
import ItemMain, { getLastMsgTxt } from './ItemMain';
import { CONVERSATION_PIC_SIZE } from './Item';
import { Map } from 'immutable';

function ItemText(props) {
  const {
    conversation,
    hasUnread,
    hasUnreceived,
    onClick,
  } = props;
  const recipient = conversation.get('recipient', Map());
  const lastMessage = conversation.get('lastMessage', Map());
  const userId = conversation.get('userId');

  function renderLastMessage() {
    const recipientId = conversation.get('recipientId');
    const typing = conversation.get('typing', Map());
    const lastMessageText = typing.get(recipientId)
      ? i18n.t('messenger.typing')
      : !lastMessage.isEmpty() ? getLastMsgTxt(lastMessage) : '';
    const showAvatar = !typing.get(recipientId) &&
      lastMessage.getIn(['author', 'id']) === userId;

    return lastMessageText
      ? <div className="messages__last-message">
          {showAvatar && <MsgUserAvatar size={20} user={lastMessage.get('author')} />}
          <span dangerouslySetInnerHTML={{ __html: lastMessageText }} />
        </div>
      : <noscript />;
  }

  return (
    <ItemMain
      createdAt={conversation.get('createdAt')}
      hasUnread={hasUnread}
      hasUnreceived={hasUnreceived}
      isMuted={conversation.get('notDisturb')}
      lastMessage={lastMessage}
      onClick={onClick}
      unreadCount={conversation.get('unreadMessagesCount')}
      userId={userId}
    >
      <span className="messages__user-avatar">
        <MsgUserAvatar size={CONVERSATION_PIC_SIZE} user={recipient} />
      </span>
      <div className="messages__dialog-text">
        <div className="messages__user-name">
          {recipient.get('slug')}
        </div>
        {renderLastMessage()}
      </div>
    </ItemMain>
  );
}

ItemText.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool.isRequired,
  hasUnreceived: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ItemText;
