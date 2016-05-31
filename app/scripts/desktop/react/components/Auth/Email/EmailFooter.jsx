/*global i18n */
import React, { PropTypes } from 'react';

function EmailFooter({ toAuth, toRecovery }) {
  function handleAuthClick(ev) {
    ev.preventDefault();
    toAuth();
  }

  function handleRecoveryClick(ev) {
    ev.preventDefault();
    toRecovery();
  }

  return (
    <div className="form-popup__footer">
      <a
        className="form-popup__footer-item"
        onClick={handleAuthClick}
        title={i18n.t('return_to_selecting_signin_method')}
      >
        {i18n.t('return_to_selecting_signin_method')}
      </a>
      <span className="form-popup__footer-sep">·</span>
      <a
        className="form-popup__footer-item"
        onClick={handleRecoveryClick}
        title={i18n.t('forgot_password_or_email')}
      >
        {i18n.t('forgot_password_or_email')}
      </a>
    </div>
  );
}

EmailFooter.propTypes = {
  toAuth: PropTypes.func.isRequired,
  toRecovery: PropTypes.func.isRequired,
};

export default EmailFooter;
