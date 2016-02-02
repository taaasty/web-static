/*global i18n */
import React, { PropTypes } from 'react';

class SettingsPhoneShow {
  render() {
    const { onEditStart, phone } = this.props;

    return (
      <div className="settings__item settings__item--full">
        <div className="settings__right">
          <button className="button button--outline" onClick={onEditStart}>
            <span className="button__text">
              {i18n.t('settings_phone_button', { context: (phone ? 'edit' : 'add') })}
            </span>
          </button>
        </div>
        <div className="settings__left">
          <h3 className="settings__title">
            {i18n.t('settings_phone')}
          </h3>
          <p className="settings__desc">
            {phone || ''}
          </p>
        </div>
      </div>
    );
  }
}

SettingsPhoneShow.propTypes = {
  onEditStart: PropTypes.func.isRequired,
  phone: PropTypes.string,
};

export default SettingsPhoneShow;
