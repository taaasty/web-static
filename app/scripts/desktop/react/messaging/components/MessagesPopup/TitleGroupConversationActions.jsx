/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../../../components/common/DropdownActions';
import DropdownAction from '../../../components/common/DropdownAction';
import ConversationsStore from '../../stores/ConversationsStore';
import ConversationActions from '../../actions/ConversationActions';
import MessagesPopupActions from '../../actions/MessagesPopupActions';
import TastyConfirmController from '../../../controllers/TastyConfirmController';

class TitleGroupConversationActions extends Component {
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
  dontDisturb(flag) {
    ConversationActions.dontDisturb(this.props.conversation.id, flag);
  }
  startSelect() {
    this.refs.dropdown.setClose();
    MessagesPopupActions.startSelect();
  }
  openSettings() {
    MessagesPopupActions.openGroupSettings(this.state.conversation);
  }
  leaveConversation() {
    TastyConfirmController.show({
      message: i18n.t('messenger.confirm.leave_text'),
      acceptButtonText: i18n.t('messenger.confirm.leave_button'),
      onAccept: () => {
        ConversationActions
          .leaveConversation(this.props.conversation.id)
          .then(() => {
            return MessagesPopupActions.openConversationList();
          });
      },
    });
  }
  render() {
    if (!this.state.conversation) {
      return <noscript />;
    }

    const { not_disturb } = this.state.conversation;

    return (
      <div className="messages__popup-title-actions">
        <DropdownActions ref="dropdown">
          <DropdownAction
            icon="icon--cogwheel"
            key="settings"
            onClick={this.openSettings.bind(this)}
            title={i18n.t('messenger.title_actions.group_settings')}
          />
          <DropdownAction
            icon="icon--bell"
            key="dont-disturb"
            onClick={this.dontDisturb.bind(this, !not_disturb)}
            title={i18n.t(`messenger.title_actions.${not_disturb ? 'disturb' : 'dont_disturb'}`)}
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
            onClick={this.leaveConversation.bind(this)}
            title={i18n.t('messenger.title_actions.leave_group')}
          />
        </DropdownActions>
      </div>
    );
  }
}

TitleGroupConversationActions.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default TitleGroupConversationActions;
