/*global i18n */
import React, { PropTypes } from 'react';

function SettingsPasswordShow({ onEditStart }) {
  function handleButtonClick(ev) {
    ev.preventDefault();
    onEditStart();
  }

  return (
    <div className="settings__item settings__item--full">
      <div className="settings__right">
        <button
          className="button button--outline"
          onClick={handleButtonClick}
        >
          <span className="button__text">
            {i18n.t('settings_password_edit_button')}
          </span>
        </button>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">
          {i18n.t('settings_password')}
        </h3>
        <p className="settings__desc">
          {i18n.t('settings_password_description')}
        </p>
      </div>
    </div>
  );
}

SettingsPasswordShow.propTypes = {
  onEditStart: PropTypes.func.isRequired,
};

export default SettingsPasswordShow;
