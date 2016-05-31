/*global i18n */
import React, { PropTypes } from 'react';

function EmailSubmitButton({ isDisabled, isProcess, onSubmit }) {
  function handleClick(ev) {
    ev.preventDefault();
    onSubmit();
  }

  return (
    <div className="form-popup__submit">
      <button
        className="button button--large button--green-light button--block button--rectangle"
        disabled={isDisabled}
        onClick={handleClick}
      >
        <span className="button__text">
          {i18n.t(isProcess ? 'email_submit_process_button' : 'email_submit_button')}
        </span>
      </button>
    </div>
  );
}

EmailSubmitButton.propTypes = {
  isDisabled: PropTypes.bool,
  isProcess: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default EmailSubmitButton;
