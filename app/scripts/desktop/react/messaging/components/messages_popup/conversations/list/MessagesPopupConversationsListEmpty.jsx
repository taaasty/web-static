/*global i18n */
import React from 'react';

class MessagesPopupConversationsListEmpty {
  render() {
    return (
      <div className="messages__list-cell">
        <div className="messages__empty">
          <div className="messages__empty-text">
            {i18n.t('conversations_empty_list')}
          </div>
        </div>
      </div>
    );
  }
}

export default MessagesPopupConversationsListEmpty;
