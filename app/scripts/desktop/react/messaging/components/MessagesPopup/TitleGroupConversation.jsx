/*global i18n */
import React, { PropTypes } from 'react';
import TitleGroupConversationActions from './TitleGroupConversationActions';
import ItemEntryPreviewImage from '../Conversations/List/ItemEntryPreviewImage';
import Avatar from '../../../../../shared/react/components/common/AvatarCamelCase';
import {
  TITLE_AVATAR_SIZE,
} from './TitlePrivateConversation';
import {
  SYMBOL_AVATAR_BG,
  SYMBOL_AVATAR_COLOR,
} from '../../constants';
import {
  dontDisturb,
  leaveConversation,
} from '../../actions/ConversationActions';
import {
  startSelect,
} from '../../actions/ThreadActions';
import {
  showConversationList,
  showGroupSettings,
} from '../../actions/MessagesPopupActions';
import {
  initGroupSettings,
} from '../../actions/GroupSettingsActions';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';

const emptyUser = Map();

function TitleGroupConversation(props) {
  const {
    activeUsers,
    conversation,
    dontDisturb,
    initGroupSettings,
    lastTyping,
    leaveConversation,
    showConversationList,
    showGroupSettings,
    startSelect,
  } = props;
  const status = !lastTyping.isEmpty()
    ? i18n.t('messenger.is_typing', { name: lastTyping.get('name') })
    : i18n.t('messenger.title_status.members', { count: activeUsers.count() });
  const avatar = conversation.get('avatar');
  const topic = conversation.get('topic');
  const userpic = {
    defaultColors: {
      background: SYMBOL_AVATAR_BG,
      name: SYMBOL_AVATAR_COLOR,
    },
    symbol: topic[0],
  };

  return (
    <div className="messages__popup-title --with-actions">
      <div className="messages__popup-title-wrapper">
        <span className="messages__user-avatar">
          {avatar && avatar.get('url')
            ? (
              <ItemEntryPreviewImage
                image={avatar}
                size={TITLE_AVATAR_SIZE}
              />
            )
            : (
              <Avatar
                size={TITLE_AVATAR_SIZE}
                userpic={userpic}
              />
            )
          }
        </span>
        <div className="messages__popup-title-text">
          {topic}
        </div>
        <div className="messages__popup-title-text --status-text">
          {status}
        </div>
      </div>
      <TitleGroupConversationActions
        conversation={conversation}
        dontDisturb={dontDisturb}
        initGroupSettings={initGroupSettings}
        leaveConversation={leaveConversation}
        showConversationList={showConversationList}
        showGroupSettings={showGroupSettings}
        startSelect={startSelect}
      />
    </div>
  );
}

TitleGroupConversation.displayName = 'TitleGroupConversation';

TitleGroupConversation.propTypes = {
  activeUsers: PropTypes.object.isRequired,
  conversation: PropTypes.object.isRequired,
  dontDisturb: PropTypes.func.isRequired,
  initGroupSettings: PropTypes.func.isRequired,
  lastTyping: PropTypes.object.isRequired,
  leaveConversation: PropTypes.func.isRequired,
  showConversationList: PropTypes.func.isRequired,
  showGroupSettings: PropTypes.func.isRequired,
  startSelect: PropTypes.func.isRequired,
};

export default connect(
  (state, { conversation }) => {
    const activeUsers = conversation
      .get('users')
      .filter((id) => !conversation.get('usersLeft', List()).includes(id))
      .filter((id) => !conversation.get('usersDeleted', List()).includes(id));
    const lastTypingRec = state
      .msg
      .typing
      .get(conversation.get('id'), List())
      .last();
    const lastTypingId = lastTypingRec && lastTypingRec.get('userId');
    const lastTyping = state
      .entities
      .getIn(['tlog', String(lastTypingId)], emptyUser);

    return {
      activeUsers,
      conversation,
      lastTyping,
    };
  },
  {
    dontDisturb,
    initGroupSettings,
    leaveConversation,
    showConversationList,
    showGroupSettings,
    startSelect,
  }
)(TitleGroupConversation);
