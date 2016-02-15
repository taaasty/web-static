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
    const { can_watch, is_watching } = this.state.conversation.entry;
    const disturb = false;

    return (
      <div className="messages__popup-title-actions">
        <DropdownActions>
          {false && <DropdownAction
            hoverTitle={disturb && i18n.t('messenger.title_actions') || null}
            icon="icon--bell"
            key="dont-disturb"
            onClick={this.disturb.bind(this, !disturb)}
            title={i18n.t('messenger.title_actions.dont_disturb')}
          />}
          {can_watch &&
          <DropdownAction
            hoverTitle={is_watching && i18n.t('stop_watch_entry_item')}
            icon="icon--comments-subscribe"
            key="watch"
            onClick={this.handleClickWatch.bind(this)}
            title={i18n.t(is_watching ? 'watching_entry_item' : 'start_watch_entry_item')}
          />}
          <DropdownAction
            icon="icon--double-tick"
            key="select-mode"
            onClick={this.startSelect}
            title={i18n.t('messenger.title_actions.start_select_mode')}
          />
          <DropdownAction
            icon="icon--arrow-left"
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
