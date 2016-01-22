/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../../../components/common/DropdownActions';
import DropdownAction from '../../../components/common/DropdownAction';
import ConversationActions from '../../actions/ConversationActions';
import MessagesPopupActions from '../../actions/MessagesPopupActions';

class TitleConversationActions extends Component {
  disturb(flag) {
    ConversationActions.disturb(this.props.conversation.id, flag);
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
  render() {
    const disturb = false;

    return (
      <div className="messages__popup-title-actions">
        <DropdownActions>
          {false && <DropdownAction
            hoverTitle={disturb && i18n.t('messenger.title_actions')}
            icon="icon--bell"
            key="dont-disturb"
            onClick={this.disturb.bind(this, !disturb)}
            title={i18n.t('messenger.title_actions.dont_disturb')}
          />}
          <DropdownAction
            icon="icon--double-tick"
            key="select-mode"
            onClick={this.startSelect}
            title={i18n.t('messenger.title_actions.start_select_mode')}
          />
          <DropdownAction
            icon="icon--not-allowed"
            key="delete-conversation"
            onClick={this.deleteConversation.bind(this)}
            title={i18n.t('messenger.title_actions.delete_conversation')}
          />
        </DropdownActions>
      </div>
    );
  }
}

TitleConversationActions.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default TitleConversationActions;
