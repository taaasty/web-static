/*global ConversationsStore */
import React, { createClass } from 'react';
//import ConversationsStore from '../../../../stores/conversations';
import ScrollerMixin from '../../../../../mixins/scroller';
import MessagesPopupConversationsListEmpty from './MessagesPopupConversationsListEmpty';
import MessagesPopupConversationsListItem from './MessagesPopupConversationsListItem';

const MessagesPopupConversationsList = createClass({
  mixins: [ ScrollerMixin ],
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
    return (this.state.activeConversations.length === 0);
  },

  getStateFromStore() {
    return ({
      activeConversations: ConversationsStore.getActiveConversations(),
    });
  },

  _onStoreChange() {
    this.setState(this.getStateFromStore());
  },
  
  render() {
    return (
      <div className="messages__body">
        <div
          className="scroller scroller--dark"
          ref="scroller"
        >
          <div className="scroller__pane js-scroller-pane">
            <div className="messages__dialogs">
              {this.isEmpty()
                 ? <MessagesPopupConversationsListEmpty />
                 : this.state.activeConversations.map((conversation, i) => (
                     <MessagesPopupConversationsListItem
                       conversation={conversation}
                       key={conversation.id}
                     />
                 ))
              }
            </div>
          </div>
          <div className="scroller__track js-scroller-track">
            <div className="scroller__bar js-scroller-bar" />
          </div>
        </div>
      </div>
    );
  },
});

export default MessagesPopupConversationsList;
