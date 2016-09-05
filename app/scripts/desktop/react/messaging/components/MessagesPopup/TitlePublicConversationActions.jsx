/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../../../components/common/DropdownActions';
import DropdownAction from '../../../components/common/DropdownAction';
import DropdownActionSPA from '../../../components/common/DropdownActionSPA';
import NoticeService from '../../../services/Notice';

class TitlePublicConversationActions extends Component {
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
      conversation,
      deleteConversation,
      showConversationList,
    } = this.props;

    deleteConversation(conversation.get('id'))
      .then(() => NoticeService.notifySuccess(i18n.t(
        'messenger.request.conversation_delete_success'))
      )
      .then(showConversationList);
  }
  render() {
    const {
      conversation,
      conversationEntry,
    } = this.props;

    if (conversation.isEmpty()) {
      return <noscript />;
    }

    const notDisturb = conversation.get('notDisturb');

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
            icon="icon--paper"
            key="visit-post"
            state={{ id: conversationEntry.get('id') }}
            title={i18n.t('messenger.title_actions.visit_post')}
            url={conversationEntry.get('url')}
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
  conversationEntry: PropTypes.object.isRequired,
  deleteConversation: PropTypes.func.isRequired,
  dontDisturb: PropTypes.func.isRequired,
  showConversationList: PropTypes.func.isRequired,
  startSelect: PropTypes.func.isRequired,
};

export default TitlePublicConversationActions;
