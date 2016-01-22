/*global i18n, RequesterMixin, ReactUnmountMixin */
import React, { createClass, PropTypes } from 'react';
import MessagesPopupConversations from './conversations';
import MessagesPopupThread from './thread';
import ConversationsStore from '../../stores/ConversationsStore';
import MessagesPopupStore, {
  CONVERSATIONS_STATE,
  CREATE_NEW_CONVERSATION_STATE,
  THREAD_STATE,
} from '../../stores/MessagesPopupStore';
import MessagingDispatcher from '../../MessagingDispatcher';
import MessagesPopupActions from '../../actions/MessagesPopupActions';
import TitleConversationActions from './TitleConversationActions';
import { PUBLIC_CONVERSATION } from '../../constants/ConversationConstants';

const ENTER_TIMEOUT = 300;
const LEAVE_TIMEOUT = 300;

const MessagesPopup = createClass({
  mixins: [ReactUnmountMixin, 'ReactActivitiesMixin', RequesterMixin],
  getInitialState() {
    return this.getStateFromStore();
  },

  componentDidMount() {
    MessagesPopupStore.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount() {
    MessagesPopupStore.removeChangeListener(this._onStoreChange);
  },

  isConversationsState() {
    return this.state.currentState === CONVERSATIONS_STATE;
  },
  
  isCreateNewConversationState() {
    return this.state.currentState === CREATE_NEW_CONVERSATION_STATE;
  },
  
  isThreadState() {
    return this.state.currentState === THREAD_STATE;
  },

  getStateFromStore() {
    return {
      currentState: MessagesPopupStore.getCurrentState(),
      currentConversationId: MessagesPopupStore.getCurrentConversationId(),
      selectState: MessagesPopupStore.getSelectState(),
    };
  },

  getTitle() {
    if (this.isThreadState()) {
      const conversation = ConversationsStore.getConversation(this.state.currentConversationId);
      if (conversation.type === PUBLIC_CONVERSATION) {
        return <TitleConversationActions title={i18n.t('messages_entry_title')} />;
      } else {
        return (
          <TitleConversationActions
            title={i18n.t('messages_thread_title', { slug: conversation.recipient.slug })}
          />
        );
      }
    } else {
      return i18n.t('messages_popup_title');
    }
  },

  handleBackButtonClick() {
    MessagingDispatcher.handleViewAction({ type: 'clickBackButton' });
  },

  _onStoreChange() {
    this.setState(this.getStateFromStore());
  },

  render() {
    const title = this.getTitle();
    let content, transitionName;

    switch(this.state.currentState) {
    case CONVERSATIONS_STATE:
      content = <MessagesPopupConversations key="conversations" />;
      transitionName = 'conversations';
      break;
    case CREATE_NEW_CONVERSATION_STATE:
      content = <MessagesPopup_CreateNewConversation key="newConversation" />;
      transitionName = 'new-conversation';
      break;
    case THREAD_STATE:
      content = <MessagesPopupThread
                  conversationId={ this.state.currentConversationId }
                  key="thread"
                />;
      transitionName = 'thread';
      break;
    }

    return (
      <Popup
        className="popup--messages"
        colorScheme="light"
        hasActivities={this.hasActivities()}
        isDraggable
        onClose={MessagesPopupActions.closeMessagesPopup}
        position={{ top: 30, left: 30 }}
        title={title}
        type="messages"
      >
        <div className="messages">
          {!this.isConversationsState() && <MessagesPopup_UIBackButton onClick={this.handleBackButtonClick} />}
          {content}
        </div>
      </Popup>
    );
  },
});

export default MessagesPopup;
