/*global ConversationsStore */
import React, { PropTypes } from 'react';
import MessagesPopupThreadForm from './MessagesPopupThreadForm';
import ConversationsListItemEntry from '../conversations/list/ConversationsListItemEntry';
import { PUBLIC_CONVERSATION } from '../../../constants/ConversationConstants';

class MessagesPopupThread {
  onClickHeader(url, ev) {
    ev.preventDefault();
    window.location.href = url;
  }
  render() {
    const id = this.props.conversationId;
    const conversation = ConversationsStore.getConversation(id);
    const backgroundUrl = conversation.type === PUBLIC_CONVERSATION
      ? conversation.entry.author.design.backgroundImageUrl
      : conversation.recipient.design.backgroundImageUrl;
    const threadStyles  = { backgroundImage: `url(${backgroundUrl})` };
    const userCount = conversation.type === PUBLIC_CONVERSATION
      ? conversation.users.length
      : 0;

    return (
      <div className="messages__section messages__section--thread">
        {conversation.type === PUBLIC_CONVERSATION &&
          <ConversationsListItemEntry
            conversation={conversation}
            hasUnread={conversation.unread_messages_count}
            onClick={this.onClickHeader.bind(this, conversation.entry.url)}
            showFooter={false}
          />
        }
        <div className="messages__body" style={threadStyles}>
          <div className="messages__thread-overlay" />
          <MessagesPopup_ThreadMessageList conversationId={id} />
        </div>
        <footer className="messages__footer">
          <MessagesPopupThreadForm conversationId={id} userCount={userCount} />
        </footer>
      </div>
    );
  }
}

MessagesPopupThread.propTypes = {
  conversationId: PropTypes.number.isRequired,
};
  
export default MessagesPopupThread;
