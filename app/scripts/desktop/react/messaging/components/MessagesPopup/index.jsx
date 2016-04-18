/*global Popup, RequesterMixin, ReactUnmountMixin */
import React, { createClass } from 'react';
import classNames from 'classnames';
import Thread from './Thread';
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
import PopupTitle from './PopupTitle';
import Popup from '../../../components/Popup';

//const ENTER_TIMEOUT = 300;
//const LEAVE_TIMEOUT = 300;

const MessagesPopup = createClass({
  mixins: [ ReactUnmountMixin, RequesterMixin ],
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
    const { currentConversationId, currentState } = this.state;
    const popupClasses = classNames({
      'popup--messages': true,
      'popup--light': true,
      '--thread': currentState === THREAD_STATE,
    });

    return (
      <Popup
        className={popupClasses}
        clue="messages"
        draggable
        onClose={MessagesPopupActions.closeMessagesPopup}
        position={{ top: 30, left: 30 }}
        title={<PopupTitle id={currentConversationId} state={currentState} />}
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
