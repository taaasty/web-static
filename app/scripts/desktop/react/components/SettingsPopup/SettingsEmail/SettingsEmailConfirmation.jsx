/*global i18n */
import React, { PropTypes } from 'react';

function SettingsEmailConfirmation(props) {
  const { isFetching, isSent, error, onResend } = props;

  function handleClick(ev) {
    ev.preventDefault();
    onResend();
  }

  function renderMessage() {
    if (isFetching) {
      return i18n.t('settings_email_confirmation_process');      
    } else if (error != null) {
      return i18n.t('settings_email_confirmation_error', { errorMessage: error });
    } else if (isSent) {
      return i18n.t('settings_email_confirmation_sent');
    } else {
      return (
        <span>
          {i18n.t('settings_email_not_confirmed')}
          {' '}
          <a onClick={handleClick} title={i18n.t('settings_email_resend_mail')}>
            {i18n.t('settings_email_resend_mail')}
          </a>
          {' '}
          {i18n.t('settings_email_check_spam')}
        </span>
      );
    }
  }

  return (
    <p className="settings__error">
      {renderMessage()}
    </p>
  );
}

SettingsEmailConfirmation.propTypes = {
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  isSent: PropTypes.bool.isRequired,
  onResend: PropTypes.func.isRequired,
};

export default SettingsEmailConfirmation;
