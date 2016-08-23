/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../../../components/common/DropdownActions';
import DropdownAction from '../../../components/common/DropdownAction';
import TastyConfirmController from '../../../controllers/TastyConfirmController';
import NoticeService from '../../../services/Notice';
import { List } from 'immutable';

const emptyList = List();

class TitleGroupConversationActions extends Component {
  dontDisturb(flag) {
    const {
      conversation,
      dontDisturb,
    } = this.props;

    dontDisturb(conversation.get('id'), flag);
  }
  startSelect() {
    this.refs.dropdown.setClose();
    this.props.startSelect();
  }
  openSettings() {
    const {
      conversation,
      initGroupSettings,
      showGroupSettings,
    } = this.props;
    const users = conversation.get('usersIds', emptyList)
      .filterNot((id) => conversation.get('usersLeft', emptyList).includes(id))
      .filterNot((id) => conversation.get('usersDeleted', emptyList).includes(id));

    initGroupSettings({
      users,
      selected: users,
      admin: conversation.get('admin'),
      avatar: conversation.get('avatar'),
      id: conversation.get('id'),
      topic: conversation.get('topic'),
    });
    showGroupSettings();
  }
  leaveConversation() {
    const {
      conversation,
      leaveConversation,
      showConversationList,
    } = this.props;

    TastyConfirmController.show({
      message: i18n.t('messenger.confirm.leave_text'),
      acceptButtonText: i18n.t('messenger.confirm.leave_button'),
      onAccept: () => leaveConversation(conversation.get('id'))
          .then(() => NoticeService.notifySuccess(
            i18n.t('messenger.request.conversation_leave_success')
          ))
          .then(showConversationList),
      },
    );
  }
  render() {
    const {
      conversation,
    } = this.props;

    if (conversation.isEmpty()) {
      return <noscript />;
    }

    const notDisturb = conversation.get('notDisturb');

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
            icon={`icon--mute-${notDisturb ? 'off' : 'on'}`}
            key="dont-disturb"
            onClick={this.dontDisturb.bind(this, !notDisturb)}
            title={i18n.t(`messenger.title_actions.${notDisturb ? 'disturb' : 'dont_disturb'}`)}
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
  dontDisturb: PropTypes.func.isRequired,
  initGroupSettings: PropTypes.func.isRequired,
  leaveConversation: PropTypes.func.isRequired,
  showConversationList: PropTypes.func.isRequired,
  showGroupSettings: PropTypes.func.isRequired,
  startSelect: PropTypes.func.isRequired,
};

export default TitleGroupConversationActions;
