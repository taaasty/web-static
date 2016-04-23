import React, { createClass, PropTypes } from 'react';

import ConversationStore from '../../stores/conversation';
import ConnectStoreMixin from '../../../../shared/react/mixins/connectStore';
import ConversationsHeader from './conversations/ConversationsHeader';
import ConversationList from './conversations/ConversationList';
import CreateConversationButton from './buttons/createConversation';

const MessengerConversations = createClass({
  displayName: 'MessengerConversations',
  propTypes: {
    onConversationClick: PropTypes.func.isRequired,
    onCreateButtonClick: PropTypes.func.isRequired,
  },
  mixins: [ConnectStoreMixin(ConversationStore)],

  getStateFromStore() {
    return {
      conversations: ConversationStore.getAllChrono(),
    };
  },

  render() {
    const { onConversationClick, onCreateButtonClick } = this.props;

    return (
      <div className="messages__section messages__section--dialogs">
        <ConversationsHeader />
        <div className="messages__body">
          <ConversationList
            items={this.state.conversations}
            onItemClick={onConversationClick}
          />
        </div>
        <div className="messages__footer">
          <CreateConversationButton onClick={onCreateButtonClick} />
        </div>
      </div>
    );
  },
});

export default MessengerConversations;
