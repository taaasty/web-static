/*global i18n */
import React, { PropTypes } from 'react';
import TitlePublicConversationActions from './TitlePublicConversationActions';
import ConversationsListItemEntryPic from '../Conversations/List/ItemEntryPic';
import {
  TITLE_AVATAR_SIZE,
} from './TitlePrivateConversation';
import {
  deleteConversation,
  dontDisturb,
} from '../../actions/ConversationActions';
import {
  startSelect,
} from '../../actions/ThreadActions';
import {
  showConversationList,
} from '../../actions/MessagesPopupActions';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';

const emptyList = List();
const emptyUser = Map();
const emptyEntry = Map();

function TitlePublicConversation(props) {
  const {
    activeUsers,
    conversation,
    conversationEntry,
    conversationEntryAuthor,
    deleteConversation,
    dontDisturb,
    lastTyping,
    showConversationList,
    startSelect,
  } = props;
  const entryText = conversationEntry.get('text');
  const entryTitle = conversationEntry.get('title');
  const title = entryTitle || entryText || i18n.t('messages_entry_title');
  const status = !lastTyping.isEmpty()
    ? i18n.t('messenger.is_typing', { name: lastTyping.get('name') })
    : i18n.t('messenger.title_status.members', { count: activeUsers.count() });

  return (
    <div className="messages__popup-title --public-conversation --with-actions">
      <div className="messages__popup-title-wrapper">
        <span className="messages__user-avatar">
          <ConversationsListItemEntryPic
            entry={conversationEntry}
            entryAuthor={conversationEntryAuthor}
            size={TITLE_AVATAR_SIZE}
            title={title}
          />
        </span>
        <div className="messages__popup-title-text">
          {title}
        </div>
        <div className="messages__popup-title-text --status-text">
          {status}
        </div>
      </div>
      <TitlePublicConversationActions
        conversation={conversation}
        conversationEntry={conversationEntry}
        deleteConversation={deleteConversation}
        dontDisturb={dontDisturb}
        showConversationList={showConversationList}
        startSelect={startSelect}
      />
    </div>
  );
}

TitlePublicConversation.displayName = 'TitlePublicConversation';

TitlePublicConversation.propTypes = {
  activeUsers: PropTypes.object.isRequired,
  conversation: PropTypes.object.isRequired,
  conversationEntry: PropTypes.object.isRequired,
  conversationEntryAuthor: PropTypes.object.isRequired,
  deleteConversation: PropTypes.func.isRequired,
  dontDisturb: PropTypes.func.isRequired,
  lastTyping: PropTypes.object.isRequired,
  showConversationList: PropTypes.func.isRequired,
  startSelect: PropTypes.func.isRequired,
};

export default connect(
  (state, { conversation }) => {
    const activeUsers = conversation.get('usersIds', emptyList)
      .filter((id) => !conversation.get('usersDeleted', emptyList).includes(id));
    const lastTypingRec = state
      .msg
      .typing
      .get(conversation.get('id'), emptyList)
      .last();
    const lastTypingId = lastTypingRec && lastTypingRec.get('userId');
    const lastTyping = state
      .entities
      .getIn(['tlog', String(lastTypingId)], emptyUser);
    const conversationEntry = state
      .entities
      .getIn(['conversationEntry', String(conversation.get('entry'))], emptyEntry);
    const conversationEntryAuthor = state
      .entities
      .getIn(['tlog', String(conversationEntry.get('author'))], emptyUser);

    return {
      activeUsers,
      conversation,
      conversationEntry,
      conversationEntryAuthor,
      lastTyping,
    };
  },
  {
    deleteConversation,
    dontDisturb,
    showConversationList,
    startSelect,
  }
)(TitlePublicConversation);
