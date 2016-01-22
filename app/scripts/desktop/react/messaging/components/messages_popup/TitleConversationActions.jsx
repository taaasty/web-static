import React, { Component, PropTypes } from 'react';
import DropdownActions from '../../../components/common/DropdownActions';
import DropdownAction from '../../../components/common/DropdownAction';
import ConversationActions from '../../actions/ConversationActions';

class TitleConversationActions extends Component {
  render() {
    return (
        <div className="messages-title">
        {this.props.title}
      <div className="title-actions-container">
        <DropdownActions>
        <DropdownAction
      icon="icon--bell"
      key="dont-disturb"
      title="Не беспокоить"
          />
        <DropdownAction
      icon="icon--double-tick"
      key="select-mode"
      title="Выбрать сообщения"
        />
        <DropdownAction
      icon="icon--cancel"
      key="delete-conversation"
      title="Удалить переписку"
        />
        </DropdownActions>
        </div>
        </div>
    );
  }
}

TitleConversationActions.propTypes = {
  
};

export default TitleConversationActions;
