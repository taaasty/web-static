/*global i18n */
import React, { PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';

function SettingsPremium({ expires, showGetPremiumPopup }) {
  const expiresFmt = moment(expires).format('LL');
  const inFuture = moment().isBefore(expires);
  const descClasses = classNames({
    'settings__desc': true,
    'settings__desc--red': expires && !inFuture,
  });

  function handleButtonClick(ev) {
    ev.preventDefault();

    showGetPremiumPopup();
  }

  function getContext() {
    if (expires) {
      return inFuture ? 'in_future' : 'expired';
    } else {
      return 'support';
    }
  }

  return (
    <div className="settings__item settings__item--full">
      <div className="settings__right">
        <button className="button button--outline" onClick={handleButtonClick}>
          <span className="button__text">
            {i18n.t(`settings.premium.${expires ? 'extend' : 'get'}`)}
          </span>
        </button>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">
          {i18n.t('settings.premium.title')}
        </h3>
        <p className={descClasses}>
          {i18n.t('settings.premium.desc', { context: getContext(), date: expiresFmt })}
        </p>
      </div>
    </div>
  );
}

SettingsPremium.displayName = 'SettingsPremium';

SettingsPremium.propTypes = {
  expires: PropTypes.string,
  showGetPremiumPopup: PropTypes.func.isRequired,
};

export default SettingsPremium;
