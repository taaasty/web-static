import React, { PropTypes } from 'react';

function BackButton({ onClick }) {
  return (
      <div className="messages__back js-messages-back" onClick={onClick}>
      <div className="icon icon--arrow-left" />
    </div>
  );
}

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BackButton;
