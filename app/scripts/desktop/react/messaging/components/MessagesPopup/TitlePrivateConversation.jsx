/*global i18n */
import React, { PropTypes } from 'react';
import moment from 'moment';
import TitlePrivateConversationActions from './TitlePrivateConversationActions';

function TitlePrivateConversation({ conversation }) {
  function status() {
    if (conversation.recipient.is_online) {
      return i18n.t('messenger.title_status.online');
    } else {
      const at = conversation.recipient.last_seen_at;

      return moment(at).calendar(null, {
        sameDay: function() {
          return i18n.t('messenger.title_status.last_seen_ago', {
            ago: moment(at).fromNow(),
          });
        },
        lastDay: i18n.t('messenger.title_status.last_seen_yesterday'),
        lastWeek: i18n.t('messenger.title_status.last_seen_at'),
        sameElse: i18n.t('messenger.title_status.last_seen_at'),
      });
    }
  }

  return (
    <div className="messages__popup-title --with-actions">
      <div className="messages__popup-title-text">
        {conversation.recipient.slug}
      </div>
      <div className="messages__popup-title-text --status-text">
        {status()}
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
