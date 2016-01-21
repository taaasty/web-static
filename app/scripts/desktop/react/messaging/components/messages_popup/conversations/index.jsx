import React from 'react';
import MessagesPopupConversationsList from './list';
import MessagesPopupUICreateNewConversationButton from './MessagesPopupUICreateNewConversationButton';
import MessagingDispatcher from '../../../MessagingDispatcher';

class MessagesPopupConversations {
  handleCreateNewConversation() {
    MessagingDispatcher.handleViewAction({
      type: 'clickNewConversation',
    });
  }
  render() {
    return (
      <div className="messages__section messages__section--dialogs">
        <MessagesPopupConversationsList />
        <footer className="messages__footer">
          <MessagesPopupUICreateNewConversationButton onClick={this.handleCreateNewConversation} />
        </footer>
      </div>
    );
  }
}

export default MessagesPopupConversations;
