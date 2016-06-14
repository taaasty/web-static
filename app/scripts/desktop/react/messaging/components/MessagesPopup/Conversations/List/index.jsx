import moment from 'moment';
import React, { createClass } from 'react';
import ConversationsStore from '../../../../stores/ConversationsStore';
import Scroller from '../../../../../components/common/Scroller';
import Empty from './Empty';
import Item from './Item';

const ConversationList = createClass({
  getInitialState() {
    return this.getStateFromStore();
  },

  componentDidMount() {
    ConversationsStore.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount() {
    ConversationsStore.removeChangeListener(this._onStoreChange);
  },

  isEmpty() {
    return (this.state.conversations.length === 0);
  },

  getStateFromStore() {
    return ({
      conversations: ConversationsStore.getConversations() || [],
    });
  },

  _onStoreChange() {
    this.setState(this.getStateFromStore());
  },

  sortConversations(conversations) {
    function calcWeight(conv) {
      const weight = 0
            + (conv.unread_messages_count > 0 ? 1e6 : 0)
            - (conv.entry && !conv.entry.is_watching ? 1e5 : 0)
            + (conv.last_message ? moment(conv.last_message.created_at).valueOf() / 1e9 : 0);

      return { ...conv, weight };
    }

    return conversations
      .map(calcWeight)
      .sort((a, b) => b.weight - a.weight); // more weight -> lower index
  },
  
  render() {
    const sortedConversations = this.sortConversations(this.state.conversations);
    return (
      <div className="messages__body">
        <Scroller>
          <div className="messages__dialogs">
            {this.isEmpty()
               ? <Empty />
               : sortedConversations.map((conversation) => (
                   <Item
                     conversation={conversation}
                     key={conversation.id}
                   />
                 ))
            }
          </div>
        </Scroller>
      </div>
    );
  },
});

export default ConversationList;
