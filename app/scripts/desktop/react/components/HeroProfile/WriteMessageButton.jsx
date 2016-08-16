/*global i18n */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  showMessagesPopup,
} from '../../actions/AppStateActions';

function WriteMessageButton(props) {
  const {
    showMessagesPopup,
    userId,
  } = props;

  function handleClick() {
    showMessagesPopup(userId);
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
  showMessagesPopup: PropTypes.func.isRequired,
  userId: PropTypes.number,
};

export default connect(
  null,
  {
    showMessagesPopup,
  }
)(WriteMessageButton);
