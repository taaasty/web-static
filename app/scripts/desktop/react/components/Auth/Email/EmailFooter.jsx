/*global i18n, ReactApp */
import React from 'react';
import Auth from '../index';
import Recovery from '../Recovery';

function EmailFooter(props) {
  function handleAuthClick(ev) {
    ev.preventDefault();
    ReactApp.shellbox.show(Auth, props);
  }

  function handleRecoveryClick(ev) {
    ev.preventDefault();
    ReactApp.shellbox.show(Recovery);
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

export default EmailFooter;
