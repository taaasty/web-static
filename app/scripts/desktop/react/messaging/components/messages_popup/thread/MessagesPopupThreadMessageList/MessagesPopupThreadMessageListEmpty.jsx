/*global i18n */
import React from 'react';

function MessagesPopupThreadMessageListEmpty(props) {
  return (
    <div className="messages__empty">
      <div className="messages__empty-text">
        {i18n.t('messages_empty_list')}
      </div>
    </div>
  );
}

export default MessagesPopupThreadMessageListEmpty;
