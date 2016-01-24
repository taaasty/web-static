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

class Thread extends Component {
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
  stopSelect() {
    MessagesPopupActions.stopSelect();
  }
  onClickHeader(url, ev) {
    ev.preventDefault();
    window.location.href = url;
  }
  render() {
    const { conversation, selectState } = this.state;
    if (!conversation) {
      return null;
    }

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
      'messages__section--select': selectState,
    });
    
    return (
      <div className={containerClasses}>
        {conversation.type === PUBLIC_CONVERSATION &&
          <PublicConversationHeader
            conversation={conversation}
            onClick={this.onClickHeader.bind(this, conversation.entry.url)}
          />}
        <div className="messages__body" style={threadStyles}>
          <div className="messages__thread-overlay" />
          <MessagesPopupThreadMessageList conversationId={id} selectState={selectState}/>
        </div>
        <footer className="messages__footer">
          {selectState
             ? <MessagesPopupSelectFooter stopSelect={this.stopSelect} />
             : <MessagesPopupThreadForm conversationId={id} userCount={userCount} />
          }
        </footer>
      </div>
    );
  }
}

Thread.propTypes = {
  conversationId: PropTypes.number.isRequired,
};
  
export default Thread;
