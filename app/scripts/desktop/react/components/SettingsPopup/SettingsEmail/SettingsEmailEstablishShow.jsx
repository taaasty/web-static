/*global i18n */
import React, { PropTypes } from 'react';

function SettingsEmailEstablishShow({ onEditStart }) {
  return (
    <div className="settings__item settings__item--full">
      <div className="settings__right">
        <button className="button button--outline" onClick={onEditStart}>
          <span className="button__text">
            {i18n.t('settings_email_establish')}
          </span>
        </button>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">
          {i18n.t('settings_email')}
        </h3>
        <p className="settings__desc">
          {i18n.t('settings_email_description')}
        </p>
      </div>
    </div>
  );
}

SettingsEmailEstablishShow.propTypes = {
  onEditStart: PropTypes.func.isRequired,
};
  
export default SettingsEmailEstablishShow;
