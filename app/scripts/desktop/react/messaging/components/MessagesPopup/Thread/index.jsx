/*global messagingService */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ThreadForm from './ThreadForm';
import SelectForm from './SelectForm';
import GroupConversationHeader from './GroupConversationHeader';
import MessageList from './MessageList';
import MessagesStore from '../../../stores/MessagesStore';
import MessagesPopupStore from '../../../stores/MessagesPopupStore';
import MessagesPopupActions from '../../../actions/MessagesPopupActions';
import { browserHistory } from 'react-router';
import uri from 'urijs';
import {
  PRIVATE_CONVERSATION,
  PUBLIC_CONVERSATION,
  GROUP_CONVERSATION,
} from '../../../constants/ConversationConstants';

class Thread extends Component {
  state = this.getStateFromStore();
  componentDidMount() {
    this.listener = this.syncStateWithStore.bind(this);
    MessagesPopupStore.addChangeListener(this.listener);
    MessagesStore.addChangeListener(this.listener);
  }
  componentWillUnmount() {
    MessagesPopupStore.removeChangeListener(this.listener);
    MessagesStore.removeChangeListener(this.listener);
  }
  syncStateWithStore() {
    this.setState(this.getStateFromStore());
  }
  getStateFromStore() {
    const { id } = this.props.conversation;

    return {
      selectState: MessagesPopupStore.getSelectState(),
      selectedIds: MessagesStore.getSelection(),
      canDelete: MessagesStore.canDelete(),
      canDeleteEverywhere: MessagesStore.canDeleteEverywhere(id),
    };
  }
  stopSelect() {
    MessagesPopupActions.stopSelect();
  }
  deleteMessages(all) {
    messagingService.deleteMessages(
      this.props.conversation.id,
      this.state.selectedIds,
      all
    );
  }
  onClickHeader(entry, ev) {
    ev.preventDefault();
    browserHistory.push({ pathname: uri(entry.url).path(), state: { id: entry.id } });
  }
  threadStyles() {
    const { conversation } = this.props;

    if (conversation.type === PUBLIC_CONVERSATION) {
      const authorDesign = conversation.entry.author.design;

      return authorDesign.backgroundId
        ? { backgroundImage: `url(${authorDesign.backgroundImageUrl})` }
        : {};
    } else if (conversation.type === GROUP_CONVERSATION) {
      return conversation.background_image && conversation.background_image.url || {};
    } else {
      const recipientDesign = conversation.recipient.design;

      return recipientDesign.backgroundId
        ? { backgroundImage: `url(${recipientDesign.backgroundImageUrl})` }
        : {};
    }
  }
  handleClickGroupHeader() {
    MessagesPopupActions.openGroupSettings(this.state.conversation);
  }
  renderHeader() {
    const { conversation } = this.props;

    return conversation.type === GROUP_CONVERSATION
        ? <GroupConversationHeader
            conversation={conversation}
            onClick={this.handleClickGroupHeader.bind(this)}
          />
        : null;
  }
  render() {
    const { conversation } = this.props;
    const { canDelete, canDeleteEverywhere, selectState } = this.state;
    if (!conversation) {
      return null;
    }

    const canTalk = typeof conversation.can_talk === 'undefined' ||
            conversation.can_talk;
    const containerClasses = classNames({
      'messages__section': true,
      'messages__section--thread': true,
      'messages__section--select': selectState,
      '--private': conversation.type === PRIVATE_CONVERSATION,
      '--no-form': !canTalk,
    });
    const listClasses = classNames({
      'messages__body': true,
      'message--select-mode': selectState,
    });
    
    return (
      <div className={containerClasses}>
        {false && this.renderHeader()}
        <div className={listClasses} style={this.threadStyles()}>
          <div className="messages__thread-overlay" />
          <MessageList conversation={conversation} selectState={selectState} />
        </div>
        <footer className="messages__footer">
          {selectState
           ? <SelectForm
               canDelete={canDelete}
               canDeleteEverywhere={canDeleteEverywhere}
               deleteEverywhereFn={this.deleteMessages.bind(this, true)}
               deleteFn={this.deleteMessages.bind(this, false)}
               stopSelect={this.stopSelect}
             />
           : canTalk && <ThreadForm conversation={conversation} />
          }
        </footer>
      </div>
    );
  }
}

Thread.propTypes = {
  conversation: PropTypes.object.isRequired,
};
  
export default Thread;
