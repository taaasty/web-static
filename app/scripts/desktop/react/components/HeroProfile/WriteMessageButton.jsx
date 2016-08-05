/*global i18n */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  showThread,
} from '../../messaging/actions/MessagesPopupActions';

function WriteMessageButton({ userId }) {
  function handleClick() {
    showThread(userId); // TODO: check if working
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
  showThread: PropTypes.func.isRequired,
  userId: PropTypes.number,
};

export default connect(
  null,
  {
    showThread,
  }
)(WriteMessageButton);
