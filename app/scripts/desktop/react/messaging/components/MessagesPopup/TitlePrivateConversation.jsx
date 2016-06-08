/*global i18n */
import React, { PropTypes } from 'react';
import moment from 'moment';
import TitlePrivateConversationActions from './TitlePrivateConversationActions';
import MsgUserAvatar from './MsgUserAvatar';
import UserSlug from '../../../components/UserSlug';

export const TITLE_AVATAR_SIZE = 32;

function TitlePrivateConversation({ conversation }) {
  function status() {
    if (conversation.typing[conversation.recipient_id]) {
      return i18n.t('messenger.typing');
    } else if (conversation.recipient.is_online) {
      return i18n.t('messenger.title_status.online');
    } else {
      const at = conversation.recipient.last_seen_at;

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
          <MsgUserAvatar size={TITLE_AVATAR_SIZE} user={conversation.recipient} />
        </span>
        <div className="messages__popup-title-text">
          <UserSlug user={conversation.recipient} />
        </div>
        <div className="messages__popup-title-text --status-text">
          {status()}
        </div>
      </div>
      <TitlePrivateConversationActions conversation={conversation} />
    </div>
  );
}

TitlePrivateConversation.displayName = 'TitlePrivateConversation';

TitlePrivateConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default TitlePrivateConversation;
