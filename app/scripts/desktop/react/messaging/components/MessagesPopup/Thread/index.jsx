/*global messagingService */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ThreadForm from './ThreadForm';
import SelectForm from './SelectForm';
import PublicConversationHeader from './PublicConversationHeader';
import GroupConversationHeader from './GroupConversationHeader';
import MessageList from './MessageList';
import MessagesStore from '../../../stores/MessagesStore';
import MessagesPopupStore from '../../../stores/MessagesPopupStore';
import MessagesPopupActions from '../../../actions/MessagesPopupActions';
import { browserHistory } from 'react-router';
import uri from 'urijs';
import { PUBLIC_CONVERSATION, GROUP_CONVERSATION } from '../../../constants/ConversationConstants';

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
  backgroundUrl() {
    const { conversation } = this.props;

    return conversation.type === PUBLIC_CONVERSATION
      ? conversation.entry.author.design.backgroundImageUrl
      : conversation.type === GROUP_CONVERSATION
        ? conversation.background_image && conversation.background_image.url
        : conversation.recipient.design.backgroundImageUrl;
  }
  handleClickGroupHeader() {
    MessagesPopupActions.openGroupSettings(this.state.conversation);
  }
  renderHeader() {
    const { conversation } = this.props;

    return conversation.type === PUBLIC_CONVERSATION
      ? <PublicConversationHeader
          conversation={conversation}
          onClick={this.onClickHeader.bind(this, conversation.entry)}
          url={conversation.entry.url}
        />
      : conversation.type === GROUP_CONVERSATION
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

    const backgroundUrl = this.backgroundUrl();
    const threadStyles  = backgroundUrl && { backgroundImage: `url(${backgroundUrl})` };
    const containerClasses = classNames({
      'messages__section': true,
      'messages__section--thread': true,
      'messages__section--select': selectState,
    });
    const listClasses = classNames({
      'messages__body': true,
      'message--select-mode': selectState,
    });
    
    return (
      <div className={containerClasses}>
        {this.renderHeader()}
        <div className={listClasses} style={threadStyles}>
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
           : <ThreadForm conversation={conversation} />
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
