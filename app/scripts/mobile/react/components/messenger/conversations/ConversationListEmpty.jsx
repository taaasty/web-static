/*global i18n */
import React from 'react';

function ConversationListEmpty() {
  return (
    <div className="messages__scroll">
      <p className="messages__text messages__text--center">
        {i18n.t('messenger.conversations_empty_list')}
      </p>
    </div>
  );
}

ConversationListEmpty.displayName = 'ConversationListEmpty';

export default ConversationListEmpty;
