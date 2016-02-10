import React from 'react';
import List from './List';
import NewConversationButton from './NewConversationButton';
import MessagingDispatcher from '../../../MessagingDispatcher';

function Conversations(props) {
  function handleCreateNewConversation() {
    MessagingDispatcher.handleViewAction({
      type: 'clickNewConversation',
    });
  }

  return (
    <div className="messages__section messages__section--dialogs">
      <List />
      <footer className="messages__footer">
        <NewConversationButton onClick={handleCreateNewConversation} />
      </footer>
    </div>
  );
}

export default Conversations;
