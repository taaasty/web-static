/*global i18n */
import React, { PropTypes } from 'react';

function Button({ onClick }) {
  return (
    <div className="messages__chooser-button" onClick={onClick}>
      <span className="messages__chooser-button-text">
        {i18n.t('new_thread_placeholder')}
      </span>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
