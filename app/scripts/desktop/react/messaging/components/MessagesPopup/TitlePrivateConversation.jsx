/*global i18n */
import React, { PropTypes } from 'react';
import moment from 'moment';
import TitlePrivateConversationActions from './TitlePrivateConversationActions';
import MsgUserAvatar from '../MsgUserAvatar';
import {
  startSelect,
} from '../../actions/ThreadActions';
import {
  deleteConversation,
  dontDisturb,
} from '../../actions/ConversationActions';
import {
  showConversationList,
} from '../../actions/MessagesPopupActions';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';

const emptyUser = Map();

export const TITLE_AVATAR_SIZE = 32;

function TitlePrivateConversation(props) {
  const {
    conversation,
    deleteConversation,
    dontDisturb,
    isRecipientTyping,
    recipient,
    showConversationList,
    startSelect,
  } = props;

  function status() {
    if (isRecipientTyping) {
      return i18n.t('messenger.typing');
    } else if (recipient.get('isOnline')) {
      return i18n.t('messenger.title_status.online');
    } else {
      const at = recipient.get('lastSeenAt');

      return at
        ? moment(at).calendar(null, {
          sameDay: function() {
            return i18n.t('messenger.title_status.last_seen_ago', {
              ago: moment(at).fromNow(),
            });
          },
          lastDay: i18n.t('messenger.title_status.last_seen_yesterday'),
          lastWeek: i18n.t('messenger.title_status.last_seen_at'),
          sameElse: i18n.t('messenger.title_status.last_seen_at'),
        })
      : '';
    }
  }

  return (
    <div className="messages__popup-title --with-actions">
      <div className="messages__popup-title-wrapper">
        <span className="messages__user-avatar">
          <MsgUserAvatar size={TITLE_AVATAR_SIZE} user={recipient} />
        </span>
        <div className="messages__popup-title-text">
          {recipient.get('slug')}
        </div>
        <div className="messages__popup-title-text --status-text">
          {status()}
        </div>
      </div>
      <TitlePrivateConversationActions
        conversation={conversation}
        deleteConversation={deleteConversation}
        dontDisturb={dontDisturb}
        recipient={recipient}
        showConversationList={showConversationList}
        startSelect={startSelect}
      />
    </div>
  );
}

TitlePrivateConversation.displayName = 'TitlePrivateConversation';

TitlePrivateConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  deleteConversation: PropTypes.func.isRequired,
  dontDisturb: PropTypes.func.isRequired,
  isRecipientTyping: PropTypes.bool.isRequired,
  recipient: PropTypes.object.isRequired,
  showConversationList: PropTypes.func.isRequired,
  startSelect: PropTypes.func.isRequired,
};

export default connect(
  (state, { conversation }) => {
    const recipient = state.entities
      .getIn(['tlog', String(conversation.get('recipient'))], emptyUser);
    const lastTypingId = state.msg
      .typing
      .get(conversation.get('id'), List())
      .last();
    const isRecipientTyping = lastTypingId === conversation.get('recipient');

    return {
      isRecipientTyping,
      recipient,
    };
  },
  {
    deleteConversation,
    dontDisturb,
    showConversationList,
    startSelect,
  }
)(TitlePrivateConversation);
