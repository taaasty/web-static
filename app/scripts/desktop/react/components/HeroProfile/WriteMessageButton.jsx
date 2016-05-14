/*global i18n */
import React, { PropTypes } from 'react';
import ConversationActions from '../../messaging/actions/ConversationActions';

function WriteMessageButton({ userId }) {
  function handleClick() {
    ConversationActions.openConversation(userId);
  }

  return (
    <button
      className="write-message-button"
      onClick={handleClick}
    >
      <i className="icon icon--messages" />
      {i18n.t('buttons.actions.write')}
    </button>
  );
}

WriteMessageButton.propTypes = {
  userId: PropTypes.number,
};

export default WriteMessageButton;
