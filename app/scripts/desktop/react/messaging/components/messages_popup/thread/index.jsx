/*global ConversationsStore */
import React, { PropTypes } from 'react';
import MessagesPopupThreadForm from './MessagesPopupThreadForm';
import ConversationsListItemEntry from '../conversations/list/ConversationsListItemEntry';
import { PUBLIC_CONVERSATION } from '../../../constants/ConversationConstants';

class MessagesPopupThread {
  render() {
    const id = this.props.conversationId;
    const conversation = ConversationsStore.getConversation(id);
    const backgroundUrl = conversation.recipient.design.backgroundImageUrl;
    const threadStyles  = { backgroundImage: `url(${backgroundUrl})` };

    return (
      <div className="messages__section messages__section--thread">
        {conversation.type === PUBLIC_CONVERSATION &&
          <ConversationsListItemEntry
            conversation={conversation}
            hasUnread={conversation.unread_messages_count}
            showUsers={false}
          />
        }
        <div className="messages__body" style={threadStyles}>
          <div className="messages__thread-overlay" />
          <MessagesPopup_ThreadMessageList conversationId={id} />
        </div>
        <footer className="messages__footer">
          <MessagesPopupThreadForm conversationId={id} />
        </footer>
      </div>
    );
  }
}

MessagesPopupThread.propTypes = {
  conversationId: PropTypes.number.isRequired,
};
  
export default MessagesPopupThread;
