/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../../../components/common/DropdownActions';
import DropdownAction from '../../../components/common/DropdownAction';
import DropdownActionSPA from '../../../components/common/DropdownActionSPA';
import TastyConfirmController from '../../../controllers/TastyConfirmController';

class TitlePrivateConversationActions extends Component {
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
  deleteConversation() {
    const {
      deleteConversation,
      showConversationList,
    } = this.props;

    TastyConfirmController.show({
      message: i18n.t('messenger.confirm.leave_text'),
      acceptButtonText: i18n.t('messenger.confirm.leave_button'),
      onAccept: () => deleteConversation(this.props.conversation.id)
        .then(showConversationList),
    });
  }
  render() {
    const {
      conversation,
      recipient,
    } = this.props;

    if (conversation.isEmpty()) {
      return <noscript />;
    }

    const notDisturb = conversation.get('notDisturb', false);
    const canDelete = conversation.get('canDelete', false);

    return (
      <div className="messages__popup-title-actions">
        <DropdownActions ref="dropdown">
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
          <DropdownActionSPA
            icon="icon--diary"
            key="visit-tlog"
            title={i18n.t('messenger.title_actions.visit_tlog')}
            url={recipient.get('tlogUrl')}
          />
          {canDelete && (
            <DropdownAction
              icon="icon--basket"
              key="delete-conversation"
              onClick={this.deleteConversation.bind(this)}
              title={i18n.t('messenger.title_actions.delete_conversation')}
            />
          )}
        </DropdownActions>
      </div>
    );
  }
}

TitlePrivateConversationActions.propTypes = {
  conversation: PropTypes.object.isRequired,
  deleteConversation: PropTypes.func.isRequired,
  dontDisturb: PropTypes.func.isRequired,
  recipient: PropTypes.object.isRequired,
  showConversationList: PropTypes.func.isRequired,
  startSelect: PropTypes.func.isRequired,
};

export default TitlePrivateConversationActions;
