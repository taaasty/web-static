import React from 'react';
import MessagesPopupConversationsList from './list';
import MessagesPopupUICreateNewConversationButton from './MessagesPopupUICreateNewConversationButton';
import MessagingDispatcher from '../../../MessagingDispatcher';

function MessagesPopupConversations(props) {
  function handleCreateNewConversation() {
    MessagingDispatcher.handleViewAction({
      type: 'clickNewConversation',
    });
  }

  return (
    <div className="messages__section messages__section--dialogs">
      <MessagesPopupConversationsList />
      <footer className="messages__footer">
        <MessagesPopupUICreateNewConversationButton onClick={handleCreateNewConversation} />
      </footer>
    </div>
  );
}

export default MessagesPopupConversations;
