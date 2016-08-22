/*global i18n */
import React, { PropTypes } from 'react';

function UnreadButton(props) {
  const {
    onClick,
  } = props;

  return (
    <div className="message--unread-button-container">
      <div className="message-unread-button" onClick={onClick}>
        {i18n.t('messenger.unread_button')}
        {' '}
        {'\u2304'}
      </div>
    </div>
  );
}

UnreadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default UnreadButton;
