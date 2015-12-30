import React, { PropTypes } from 'react';
import ConversationActions from '../../../../actions/ConversationActions';
import ConversationsListItemText from './ConversationsListItemText';
import ConversationsListItemEntry from './ConversationsListItemEntry';
import { PUBLIC_CONVERSATION } from '../../../../constants/ConversationConstants';

export const CONVERSATION_PIC_SIZE = 40;

class MessagesPopupConversationsListItem {
  hasUnread() {
    return (this.props.conversation.unread_messages_count > 0);
  }
  hasUnreceived() {
    return (this.props.conversation.unreceived_messages_count > 0);
  }
  onClick() {
    ConversationActions.clickConversation(this.props.conversation.id);
  }

  render() {
    const { conversation } = this.props;
    const props = {
      conversation,
      hasUnread: this.hasUnread(),
      hasUnreceived: this.hasUnreceived(),
      onClick: this.onClick.bind(this),
    };

    return conversation.type === PUBLIC_CONVERSATION
      ? <ConversationsListItemEntry {...props} />
      : <ConversationsListItemText {...props} />;
  }
}

MessagesPopupConversationsListItem.propTypes = {
  conversation: PropTypes.object.isRequired,
};


export default MessagesPopupConversationsListItem;
