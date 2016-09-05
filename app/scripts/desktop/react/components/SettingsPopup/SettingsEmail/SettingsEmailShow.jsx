/*global i18n */
import React, { PropTypes } from 'react';
import SettingsEmailConfirmation from  './SettingsEmailConfirmation';

function SettingsEmailShow(props) {
  const {
    confirmationEmail,
    email,
    error,
    isFetching,
    isSent,
    onCancel,
    onEditStart,
    onResend,
  } = props;
  
  const isConfirmation = confirmationEmail != null;

  function handleButtonClick(ev) {
    ev.preventDefault();
    return isConfirmation ? onCancel()
       : onEditStart();
  }

  return (
    <div className="settings__item settings__item--full">
      <div className="settings__right">
        <button
          className="button button--outline"
          onClick={handleButtonClick}
        >
          <span className="button__text">
            {isConfirmation
             ? i18n.t('settings_email_cancel_button')
             : i18n.t('settings_email_edit_button')
            }
          </span>
        </button>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">
          {i18n.t('settings_email')}
        </h3>
        <p className="settings__desc">
          {isConfirmation ? confirmationEmail : email}
        </p>
        {isConfirmation && (
            <SettingsEmailConfirmation
              confirmationEmail={confirmationEmail}
              email={email}
              error={error}
              isFetching={isFetching}
              isSent={isSent}
              onResend={onResend}
            />
          )}
      </div>
    </div>
  );
}

SettingsEmailShow.propTypes = {
  confirmationEmail: PropTypes.any,
  email: PropTypes.any.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  isSent: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onEditStart: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
};

export default SettingsEmailShow;
