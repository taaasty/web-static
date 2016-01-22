import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import MessagesPopupThreadForm from './MessagesPopupThreadForm';
import MessagesPopupSelectFooter from './MessagesPopupSelectFooter';
import PublicConversationHeader from './PublicConversationHeader';
import MessagesPopupThreadMessageList from './MessagesPopupThreadMessageList';
import ConversationsStore from '../../../stores/ConversationsStore';
import MessagesPopupStore from '../../../stores/MessagesPopupStore';
import MessagesPopupActions from '../../../actions/MessagesPopupActions';
import { PUBLIC_CONVERSATION } from '../../../constants/ConversationConstants';

class MessagesPopupThread extends Component {
  state = this.getStateFromStore();
  componentDidMount() {
    this.listener = this.syncStateWithStore.bind(this);
    ConversationsStore.addChangeListener(this.listener);
    MessagesPopupStore.addChangeListener(this.listener);
  }
  componentWillUnmount() {
    ConversationsStore.removeChangeListener(this.listener);
    MessagesPopupStore.removeChangeListener(this.listener);
  }
  syncStateWithStore() {
    this.setState(this.getStateFromStore());
  }
  getStateFromStore() {
    return {
      conversation: ConversationsStore.getConversation(this.props.conversationId),
      selectState: MessagesPopupStore.getSelectState(),
    };
  }
  startSelect() {
    MessagesPopupActions.startSelect();
  }
  stopSelect() {
    MessagesPopupActions.stopSelect();
  }
  onClickHeader(url, ev) {
    ev.preventDefault();
    window.location.href = url;
  }
  render() {
    const { conversation, select } = this.state;
    const id = conversation.id;
    const backgroundUrl = conversation.type === PUBLIC_CONVERSATION
      ? conversation.entry.author.design.backgroundImageUrl
      : conversation.recipient.design.backgroundImageUrl;
    const threadStyles  = { backgroundImage: `url(${backgroundUrl})` };
    const userCount = conversation.type === PUBLIC_CONVERSATION
      ? conversation.users.length
      : 0;
    const containerClasses = classNames({
      'messages__section': true,
      'messages__section--thread': true,
      'messages__section--select': select,
    });
    
    return (
      <div className={containerClasses}>
        {conversation.type === PUBLIC_CONVERSATION &&
          <PublicConversationHeader
            conversation={conversation}
            onClick={this.onClickHeader.bind(this, conversation.entry.url)}
            startSelect={this.startSelect}
          />}
        <div className="messages__body" style={threadStyles}>
          <div className="messages__thread-overlay" />
          <MessagesPopupThreadMessageList conversationId={id} />
        </div>
        <footer className="messages__footer">
          {select
             ? <MessagesPopupSelectFooter stopSelect={this.stopSelect} />
             : <MessagesPopupThreadForm conversationId={id} userCount={userCount} />
          }
        </footer>
      </div>
    );
  }
}

MessagesPopupThread.propTypes = {
  conversationId: PropTypes.number.isRequired,
};
  
export default MessagesPopupThread;
