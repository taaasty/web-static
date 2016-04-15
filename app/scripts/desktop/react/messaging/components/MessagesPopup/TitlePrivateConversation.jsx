/*global i18n */
import React, { PropTypes } from 'react';
import moment from 'moment';
import TitlePrivateConversationActions from './TitlePrivateConversationActions';

function TitlePrivateConversation({ conversation }) {
  function status() {
    if (conversation.recipient.is_online) {
      return i18n.t('');
    } else {
      
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
