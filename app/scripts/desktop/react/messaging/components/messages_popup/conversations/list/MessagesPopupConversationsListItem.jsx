/*global i18n */
import React, { PropTypes } from 'react';
import ConversationActions from '../../../../actions/ConversationActions';
import ConversationsListItemText from './ConversationsListItemText';
import ConversationsListItemEntry from './ConversationsListItemEntry';
import { CONVERSATION_ENTRY } from '../../../../constants/ConversationConstants';

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

    return conversation.type === CONVERSATION_ENTRY
      ? <ConversationsListItemEntry {...props} />
      : <ConversationsListItemText {...props} />;
  }
}

MessagesPopupConversationsListItem.propTypes = {
  conversation: PropTypes.object.isRequired,
};


export default MessagesPopupConversationsListItem;
