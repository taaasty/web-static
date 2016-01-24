/*global i18n, RequesterMixin, ReactUnmountMixin */
import React, { createClass, PropTypes } from 'react';
import Thread from './Thread';
import ConversationsStore from '../../stores/ConversationsStore';
import MessagesPopupStore, {
  CONVERSATIONS_STATE,
  CREATE_NEW_CONVERSATION_STATE,
  THREAD_STATE,
} from '../../stores/MessagesPopupStore';
import MessagesPopupActions from '../../actions/MessagesPopupActions';
import BackButton from './BackButton';
import CreateNewConversation from './CreateNewConversation';
import Conversations from './Conversations';
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
    const { currentConversationId } = this.state;

    if (this.isThreadState()) {
      const conversation = ConversationsStore.getConversation(currentConversationId);

      if (conversation.type === PUBLIC_CONVERSATION) {
        return (
          <div className="messages__popup-title">
            <div className="messages__popup-title-text --with-actions">
              {i18n.t('messages_entry_title')}
            </div>
            <TitleConversationActions conversation={conversation} />
          </div>
        );
      } else {
        return (
          <div className="messages__popup-title">
            <div className="messages__popup-title-text --with-actions">
              {i18n.t('messages_thread_title', { slug: conversation.recipient.slug })}
            </div>
            <TitleConversationActions conversation={conversation} />
          </div>
        );
      }
    } else {
      return (
        <div className="messages__popup-title">
          <div className="messages__popup-title-text">
            {i18n.t('messages_popup_title')}
          </div>
        </div>
      );
    }
  },

  handleBackButtonClick() {
    MessagesPopupActions.openConversationList();
  },

  _onStoreChange() {
    this.setState(this.getStateFromStore());
  },

  render() {
    const title = this.getTitle();
    let content, transitionName;

    switch(this.state.currentState) {
    case CONVERSATIONS_STATE:
      content = <Conversations key="conversations" />;
      transitionName = 'conversations';
      break;
    case CREATE_NEW_CONVERSATION_STATE:
      content = <CreateNewConversation key="newConversation" />;
      transitionName = 'new-conversation';
      break;
    case THREAD_STATE:
      content = <Thread
                  conversationId={this.state.currentConversationId}
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
          {!this.isConversationsState() && <BackButton onClick={this.handleBackButtonClick} />}
          {content}
        </div>
      </Popup>
    );
  },
});

export default MessagesPopup;
