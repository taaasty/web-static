/*global i18n */
import React, { PropTypes } from 'react';
import MsgUserAvatar from '../../MsgUserAvatar';
import ItemMain, { getLastMsgTxt } from './ItemMain';
import ItemEntryPic from './ItemEntryPic';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';

const emptyEntry = Map();
const emptyLastMessage = Map();
const emptyUser = Map();

function ItemEntry(props) {
  const {
    conversation,
    entry,
    entryAuthor,
    hasUnread,
    hasUnreceived,
    lastMessage,
    lastMessageAuthor,
    lastTyping,
    onClick,
  } = props;

  const title = entry.get('title') || entry.get('text') || i18n.t('messages_public_conversation_title');
  const [ lastMsgUser, lastMsgContent ] = !lastTyping.isEmpty()
    ? [ lastTyping, i18n.t('messenger.typing') ]
    : !lastMessage.isEmpty() && [ lastMessageAuthor, getLastMsgTxt(lastMessage) ];

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
      userId={conversation.get('userId')}
    >
      <span className="messages__user-avatar">
        <ItemEntryPic
          entry={entry}
          entryAuthor={entryAuthor}
          title={title}
        />
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
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool.isRequired,
  hasUnreceived: PropTypes.bool.isRequired,
  lastMessage: PropTypes.object.isRequired,
  lastMessageAuthor: PropTypes.object.isRequired,
  lastTyping: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default connect(
  (state, { conversation }) => {
    const lastMessage = state.entities
      .getIn(['message', String(conversation.get('lastMessage'))], emptyLastMessage);
    const lastMessageAuthor = state.entities
      .getIn(['tlog', String(lastMessage.get('author'))], emptyUser);
    const entry = state.entities
      .getIn(['conversationEntry', String(conversation.get('entry'))], emptyEntry);
    const entryAuthor = state.entities
      .getIn(['tlog', String(entry.get('author'))], emptyUser);
    const lastTypingId = state.msg
      .typing
      .get(conversation.get('id'), List())
      .last();
    const lastTyping = state.entities
      .getIn(['tlog', String(lastTypingId)], emptyUser);

    return {
      entry,
      entryAuthor,
      lastMessage,
      lastMessageAuthor,
      lastTyping,
    };
  }
)(ItemEntry);
