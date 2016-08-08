/*global i18n */
import React, { PropTypes } from 'react';
import MsgUserAvatar from '../../MsgUserAvatar';
import ItemMain, { getLastMsgTxt } from './ItemMain';
import { CONVERSATION_PIC_SIZE } from '../../../constants';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';

const emptyUser = Map();
const emptyLastMessage = Map();

function ItemText(props) {
  const {
    conversation,
    hasUnread,
    hasUnreceived,
    isRecipientTyping,
    lastMessage,
    lastMessageAuthor,
    onClick,
    recipient,
  } = props;
  const userId = conversation.get('userId');

  function renderLastMessage() {
    const lastMessageText = isRecipientTyping
      ? i18n.t('messenger.typing')
      : !lastMessage.isEmpty() ? getLastMsgTxt(lastMessage) : '';
    const showAvatar = !isRecipientTyping &&
      lastMessageAuthor.get('id') === userId;

    return lastMessageText
      ? <div className="messages__last-message">
          {showAvatar && <MsgUserAvatar size={20} user={lastMessageAuthor} />}
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
      lastMessageAuthor={lastMessageAuthor}
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
  isRecipientTyping: PropTypes.bool.isRequired,
  lastMessage: PropTypes.object.isRequired,
  lastMessageAuthor: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  recipient: PropTypes.object.isRequired,
};

export default connect(
  (state, { conversation }) => {
    const lastMessage = state.entities
      .getIn(['message', String(conversation.get('lastMessage'))], emptyLastMessage);
    const lastMessageAuthor = state.entities
      .getIn(['tlog', String(lastMessage.get('author'))], emptyUser);
    const recipient = state.entities
      .getIn(['tlog', String(conversation.get('recipient'))], emptyUser);
    const lastTypingId = state.msg
      .typing
      .get(conversation.get('id'), List())
      .last();
    const isRecipientTyping = lastTypingId === conversation.get('recipient');

    return {
      isRecipientTyping,
      lastMessage,
      lastMessageAuthor,
      recipient,
    };
  }
)(ItemText);
