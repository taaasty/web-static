/*global i18n */
import React, { PropTypes } from 'react';
import ConversationActions from '../../messaging/actions/ConversationActions';

function WriteMessageButton({ user }) {
  function handleClick() {
    ConversationActions.openConversation(user.id);
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
  user: PropTypes.object.isRequired,
};

export default WriteMessageButton;
