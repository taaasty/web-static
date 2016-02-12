/*global i18n, Popup, RequesterMixin, ReactUnmountMixin */
import React, { createClass } from 'react';
import Thread from './Thread';
import ConversationsStore from '../../stores/ConversationsStore';
import MessagesPopupStore, {
  CONVERSATIONS_STATE,
  CREATE_NEW_CONVERSATION_STATE,
  THREAD_STATE,
  GROUP_SETTINGS_STATE,
  GROUP_CHOOSER_STATE,
} from '../../stores/MessagesPopupStore';
import MessagesPopupActions from '../../actions/MessagesPopupActions';
import BackButton from './BackButton';
import CreateNewConversation from './CreateNewConversation';
import Conversations from './Conversations';
import GroupSettings from './GroupSettings';
import GroupChooser from './GroupChooser';
import TitleConversationActions from './TitleConversationActions';
import { PUBLIC_CONVERSATION } from '../../constants/ConversationConstants';

//const ENTER_TIMEOUT = 300;
//const LEAVE_TIMEOUT = 300;

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

  getStateFromStore() {
    return {
      currentState: MessagesPopupStore.getCurrentState(),
      currentConversationId: MessagesPopupStore.getCurrentConversationId(),
      selectState: MessagesPopupStore.getSelectState(),
    };
  },

  title() {
    const { currentState, currentConversationId } = this.state;

    if (currentState === THREAD_STATE) {
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
    MessagesPopupActions.backButtonClick();
  },

  _onStoreChange() {
    this.setState(this.getStateFromStore());
  },

  renderContents() {
    const { currentState, currentConversationId } = this.state;

    switch(currentState) {
    case CONVERSATIONS_STATE:
      return <Conversations key="conversations" />;
    case CREATE_NEW_CONVERSATION_STATE:
      return <CreateNewConversation key="newConversation" />;
    case THREAD_STATE:
      return <Thread conversationId={currentConversationId} key="thread"/>;
    case GROUP_SETTINGS_STATE:
      return <GroupSettings key="groupSettings" />;
    case GROUP_CHOOSER_STATE:
      return <GroupChooser key="groupChooser" />;
    }
  },

  render() {
    const { currentState } = this.state;

    return (
      <Popup
        className="popup--messages"
        colorScheme="light"
        hasActivities={this.hasActivities()}
        isDraggable
        onClose={MessagesPopupActions.closeMessagesPopup}
        position={{ top: 30, left: 30 }}
        title={this.title()}
        type="messages"
      >
        <div className="messages">
          {currentState !== CONVERSATIONS_STATE &&
           <BackButton onClick={this.handleBackButtonClick} />
          }
          {this.renderContents()}
        </div>
      </Popup>
    );
  },
});

export default MessagesPopup;
