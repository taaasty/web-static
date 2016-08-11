/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../../../components/common/DropdownActions';
import DropdownAction from '../../../components/common/DropdownAction';
import NoticeService from '../../../services/Notice';
import { browserHistory } from 'react-router';
import uri from 'urijs';

class TitlePublicConversationActions extends Component {
  dontDisturb(flag) {
    ConversationActions.dontDisturb(this.props.conversation.id, flag);
  }
  startSelect() {
    this.refs.dropdown.setClose();
    MessagesPopupActions.startSelect();
  }
  deleteConversation() {
    ConversationActions
      .deleteConversation(this.props.conversation.id)
      .then(() => NoticeService.notifySuccess(i18n.t(
        'messenger.request.conversation_delete_success'))
      )
      .then(() => {
        return MessagesPopupActions.openConversationList();
      });
  }
  navigatePost() {
    const { conversation } = this.state;

    if (conversation && conversation.entry && conversation.entry.url) {
      browserHistory.push({ pathname: uri(conversation.entry.url).path(), state: { id: conversation.entry.id } });
    }
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
            icon={`icon--mute-${not_disturb ? 'off' : 'on'}`}
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
            icon="icon--paper"
            key="visit-post"
            onClick={this.navigatePost.bind(this)}
            title={i18n.t('messenger.title_actions.visit_post')}
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
