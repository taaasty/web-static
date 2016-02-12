/*global i18n */
import React from 'react';
import List from './List';
import FooterButton from '../FooterButton';
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
      <FooterButton onClick={handleCreateNewConversation} text={i18n.t('new_thread_button')} />
    </div>
  );
}

export default Conversations;
