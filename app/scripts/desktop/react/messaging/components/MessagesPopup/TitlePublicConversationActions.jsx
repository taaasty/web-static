/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../../../components/common/DropdownActions';
import DropdownAction from '../../../components/common/DropdownAction';
import ConversationsStore from '../../stores/ConversationsStore';
import ConversationActions from '../../actions/ConversationActions';
import MessagesPopupActions from '../../actions/MessagesPopupActions';

class TitlePublicConversationActions extends Component {
  componentWillMount() {
    this.syncStateWithStore = () => this.setState({
      conversation: ConversationsStore.getConversation(this.props.conversation.id),
    });
    this.syncStateWithStore();
    ConversationsStore.addChangeListener(this.syncStateWithStore);
  }
  componentWillUnmount() {
    ConversationsStore.removeChangeListener(this.syncStateWithStore);
  }
  disturb(flag) {
    ConversationActions.disturb(this.state.conversation.id, flag);
  }
  startSelect() {
    this.refs.dropdown.setClose();
    MessagesPopupActions.startSelect();
  }
  deleteConversation() {
    ConversationActions
      .deleteConversation(this.props.conversation.id)
      .then(() => {
        return MessagesPopupActions.openConversationList();
      });
  }
  handleClickWatch(ev) {
    const { id, entry: { is_watching } } = this.state.conversation;

    ev.preventDefault();
    ev.stopPropagation();

    if (is_watching) {
      ConversationActions.conversationEntryRemoveFromWatching(id);
    } else {
      ConversationActions.conversationEntryAddToWatching(id);
    }
  }
  render() {
    if (!this.state.conversation) {
      return <noscript />;
    }

    const disturb = false;

    return (
      <div className="messages__popup-title-actions">
        <DropdownActions ref="dropdown">
          <DropdownAction
            hoverTitle={disturb && i18n.t('messenger.title_actions') || null}
            icon="icon--bell"
            key="dont-disturb"
            onClick={this.disturb.bind(this, !disturb)}
            title={i18n.t('messenger.title_actions.dont_disturb')}
          />
          <DropdownAction
            icon="icon--double-tick"
            key="select-mode"
            onClick={this.startSelect.bind(this)}
            title={i18n.t('messenger.title_actions.start_select_mode')}
          />
          <DropdownAction
            icon="icon--basket"
            key="delete-conversation"
            onClick={this.deleteConversation.bind(this)}
            title={i18n.t('messenger.title_actions.leave_conversation')}
          />
        </DropdownActions>
      </div>
    );
  }
}

TitlePublicConversationActions.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default TitlePublicConversationActions;
