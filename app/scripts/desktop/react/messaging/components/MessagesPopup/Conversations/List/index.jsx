import moment from 'moment';
import React, { createClass } from 'react';
import ConversationsStore from '../../../../stores/ConversationsStore';
import Scroller from '../../../../../components/common/Scroller';
import Empty from './Empty';
import Item from './Item';
import { PRIVATE_CONVERSATION } from '../../../../constants/ConversationConstants';

const READ_MESSAGES_DAYS_DIVIDER = 5;

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
              + (conv.type === PRIVATE_CONVERSATION ||
                 conv.entry && conv.entry.is_watching ? 100 : 0)
              + (conv.unread_messages_count > 0 ? 50 : 0)
              + (conv.unread_messages_count === 0 &&
                 moment(conv.updated_at).isAfter(moment().subtract(READ_MESSAGES_DAYS_DIVIDER, 'days')) ? 20 : 0)
              + (conv.type === PRIVATE_CONVERSATION ? 10 : 0);

      return { ...conv, weight };
    }

    return conversations
      .sort((a, b) => moment(b.updated_at).valueOf() - moment(a.updated_at).valueOf())
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
