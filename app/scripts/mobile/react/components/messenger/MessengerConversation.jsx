/*global i18n */
import React, { createClass } from 'react';
import ConversationStore from '../../stores/conversation';
import ConnectStoreMixin from '../../../../shared/react/mixins/connectStore';
import ConversationHeader from './conversation/header';
import ConversationMessages from './conversation/messages';
import ConversationMessageForm from './conversation/messageForm';
import { PUBLIC_CONVERSATION, GROUP_CONVERSATION } from '../../constants/MessengerConstants';

const MessengerConversation = createClass({
  displayName: 'MessengerConversation',
  mixins: [ConnectStoreMixin(ConversationStore)],

  getStateFromStore() {
    return {
      conversation: ConversationStore.getCurrent(),
    };
  },

  render() {
    const { conversation } = this.state;
    const { can_talk, id, type } = conversation;
    const backgroundUrl = type === PUBLIC_CONVERSATION
            ? conversation.entry.author.design.backgroundUrl
            : type === GROUP_CONVERSATION
              ? conversation.background_image &&
                conversation.background_image.url
              : conversation.recipient.design.background_url;

    const title = type === PUBLIC_CONVERSATION
            ? 'public'
            : type === GROUP_CONVERSATION
              ? 'group'
              : conversation.recipient.slug;
    const conversationStyles = { backgroundImage: `url("${backgroundUrl}")` };
    const canTalk = typeof can_talk === 'undefined' || can_talk;
    

    return (
      <div className="messages__section messages__section--thread">
        <ConversationHeader slug={title} />
        <div className="messages__body" style={conversationStyles}>
          <div className="messages__thread-overlay" />
          <ConversationMessages />
        </div>
        <div className="messages__footer">
          <ConversationMessageForm convID={id} canTalk={canTalk} />
        </div>
      </div>
    );
  },
});

export default MessengerConversation;
